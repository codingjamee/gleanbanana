//import bcrypt from "bcrypt";
//import hashPassword from "../utils/hash-password";
import { ulid } from "ulidx";
import db from "../db/index_multi";
import { NotFoundError } from "../../libraries/custom-error";
import jwt from "jsonwebtoken";
import mysql from "mysql2";

class userService {
  static async addUser({ email, password, username, address, phone_number }) {
    // 비밀번호 해쉬화
    // const hashedPassword = await hashPassword(password, 10);

    const user_id = ulid();
    const today = new Date();
    const newUser = {
      user_id,
      email,
      password,
      username,
      address,
      phone_number,
      my_carbon: 0,
      createdAt: today,
      updatedAt: today,
      deletedAt: null,
    };
    const cart_id = ulid();

    const query1 = `INSERT INTO user SET ?; `;
    const query1s = mysql.format(query1, newUser);

    // 회원가입과 동시에 카트를 추가하는 부분
    const newCart = { cart_id, user_id };
    const query2 = `INSERT INTO cart SET ?; `;
    const query2s = mysql.format(query2, newCart);

    return new Promise((resolve, reject) => {
      db.query(query1s + query2s, function (error, results) {
        if (error) {
          if (error.errno === 1062) {
            // code: 'ER_DUP_ENTRY'
            reject(new ConflictError("이미 가입된 이메일입니다."));
          }
          console.log("error : ");
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // 비밀번호 추가 작성 필요
  // 유저 로그인
  static async loginUser({ email, password }) {
    const query = `SELECT user_id, email, password FROM user WHERE email = ?`;
    return new Promise((resolve, reject) => {
      db.query(query, email, function (error, results, fields) {
        if (error) {
          console.log("error : ", error);
          reject(error);
        } else {
          // 로그인 성공 -> JWT 웹 토큰 생성
          const secretKey = process.env.JWT_SECRET_KEY || "secret-key";

          // 토큰의 내용/ 토큰의 비밀 키/ 토큰의 설정
          const token = jwt.sign({ user_id: results[0]["user_id"] }, secretKey);

          // 반환할 loginuser 객체
          const loginUser = {
            token,
            email,
            errorMessage: null,
          };
          resolve(loginUser);
        }
      });
    });
  }

  // 유저 정보 조회
  static async getUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE user_id = ?`;

      db.query(query, user_id, function (error, results, fields) {
        if (error) {
          reject();
        } else {
          if (results?.length === 0) {
            // id에 해당되는 유저가 없는 경우
            reject(new NotFoundError("해당하는 유저를 찾을 수 없습니다."));
          }
          if (results[0]?.deletedAt) {
            // 탈퇴한 유저인 경우
            // 보안을 위해 같은 메시지 출력
            reject(new NotFoundError("해당하는 유저를 찾을 수 없습니다."));
          }
          resolve(results);
        }
      });
    });
  }

  // 유저 정보 수정
  static async updateUser({
    user_id,
    password,
    username,
    address,
    phone_number,
  }) {
    const updatedUser = {
      password,
      username,
      address,
      phone_number,
      updatedAt: new Date(),
    };
    var query = `UPDATE user SET ? WHERE user_id = ?;`;
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [updatedUser, user_id],
        function (error, results, fields) {
          if (error) {
            console.log("error : ", error);
            reject(error);
          } else {
            if (results.affectedRows === 0) {
              reject(new NotFoundError("해당하는 유저를 찾을 수 없습니다."));
            }
            resolve(results);
          }
        }
      );
    });
  }

  // 회원 탈퇴
  static async deleteUser({ user_id }) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE user SET deletedAt = ? WHERE user_id = ? ;`;
      const today = new Date();
      db.query(query, [today, user_id], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}
export { userService };
