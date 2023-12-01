import db from "../db";
const table_name = "orders";
const { uuid } = require("uuidv4");
class orderService {
  //주문내역 전체 조회
  static async getOrders({ userId }) {
    console.log("orderService getOrders userid = ", userId);
    return new Promise((resolve, reject) => {
      //주문테이블 조회 쿼리
      //const query = `SELECT * FROM ${table_name} WHERE user_id = '${userId}'`;
      //order_item테이블 테스트쿼리
      //const query = `SELECT item_id,quantity FROM order_item WHERE order_id in (select order_id from orders where user_id = '${userId}')`;
      //주문테이블과 order_item테이블 조인 쿼리
      const query = `SELECT ${table_name}.*,order_item.item_id_list,order_item.quantity_list,date_add(now(), interval item.expected_delivery day) as expected_delivery 
      FROM ${table_name} inner join order_item 
      on ${table_name}.order_id = order_item.order_id
      inner join item
      on order_item.item_id = item.item_id
      where ${table_name}.user_id = '${userId}'`;
      console.log("query(innerjoin) : ", query);
      db.query(query, function (error, results) {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            console.log("getOrders results값 확인 == ", results);
            resolve(results);
          } else {
            reject(new Error("주문내역이 없습니다."));
          }
        }
      });
      //test query
      // var order_id_arr = [];
      // db.query(query, function (err, row) {
      //   if (err) {
      //     reject(err);
      //     console.log("1111111111111111111111111111111111111111");
      //   } else {
      //     for (var i = 0; i < row.length; i++) {
      //       console.log("222222222222222222222222222222222222222222222");
      //       console.log("row[0].order_id 확인 == ", row[i].order_id);
      //       order_id_arr.push(row[i].order_id);
      //       console.log("order_id_arr.push() == ", order_id_arr[i]);
      //     }
      //     console.log(
      //       "000000000000000000(order_id_arr.length) : ",
      //       order_id_arr.length
      //     );
      //     for (var j = 0; j < order_id_arr.length; j++) {
      //       console.log("333333333333333333333333333333333333");
      //       console.log("order_id_arr[j] == ", order_id_arr[j]);
      //     }
      //     const testquery = `SELECT expected_delievery from item`;
      //     console.log("testquery : ", testquery);
      //     const query2 = `SELECT ${table_name}.*,order_item.item_id,order_item.quantity FROM ${table_name} inner join order_item on ${table_name}.order_id = order_item.order_id where ${table_name}.user_id = '${userId}'`;
      //     console.log("query2 : ", query2);
      //     db.query(query2, function (error, results) {
      //       if (error) {
      //         reject(error);
      //       } else {
      //         if (results.length > 0) {
      //           console.log("getOrders results값 확인 == ", results);
      //           resolve(results);
      //         } else {
      //           reject(new Error("주문내역이 없습니다."));
      //         }
      //       }
      //     });
      //   }
      // });
    });
  }

  // 추가
  static async createOrder({ userId, pay_method, item }) {
    var moment = require("moment");
    console.log("moment() : ", moment());
    //var time = moment().format("yyyy-mm-dd:hh:mm:ss");
    var time = moment().format("YYYY-MM-DD HH:mm:ss");
    //var time = moment().format("YYYY-MM-DD:hh:mm:ss");
    console.log("time : ", time);
    //console.log("orderservice데이터추가 값확인(id) : ", id);
    //console.log("orderservice데이터추가 값확인(quantity) : ", quantity);
    console.log("orderservice데이터추가 값확인(item) : ", item);
    //console.log("orderservice데이터추가 값확인(index) : ", index);
    console.log("orderservice데이터추가 값확인(userId) : ", userId);
    console.log("orderservice데이터추가 값확인(CURRENT_TIMESTAMP) : ", time);
    console.log("orderservice데이터추가 값확인(paymentmethod) : ", pay_method);
    //console.log("orderservice데이터추가 값확인(deliveryDate) : ", deliveryDate);
    //console.log("uuid()111111111 : " + uuid());
    var item_id_list = [];
    var quantity_list = [];
    var max_num_temp = 0;
    let last_delivery_item_id = null;
    let last_delivery_item_quantity = null;

    var insertValArr1 = {
      order_id: uuid(),
      user_id: userId,
      order_date_createdAt: time,
      pay_method: pay_method,
    };

    let insertValArr_list = [];
    for (var item_index = 0; item_index < item.length; item_index++) {
      console.log("item[item_index].id == ", item[item_index].id);
      console.log("item[item_index].quantity == ", item[item_index].quantity);
      console.log("item.length == ", item.length);
      console.log("item_index == ", item_index);
      var insertValArr2 = {
        order_id: insertValArr1.order_id,
        item_id: item[item_index].id,
        quantity: item[item_index].quantity,
      };
      insertValArr_list.push(insertValArr2);
      console.log("insertValArr_list : ", insertValArr_list);
      //console.log("insertValArr2 : ", insertValArr2);
    }
    if (insertValArr_list.length > 0) {
      console.log(
        "insertValArr_list.length > 0 ?? : ",
        insertValArr_list.length
      );
      await insertOrderItem(db, [insertValArr_list]);
    }

    async function insertOrderItem(db, [values]) {
      console.log("insertOrderItem 메서드 진입 : ", insertOrderItem);
      const insertquery2 =
        "INSERT INTO 'order_item'('order_id','item_id','quantity') values ?"; // 주문내역물품정보
      console.log(
        "insertOrderItem 메서드 진입 2222222222222: ",
        insertOrderItem
      );
      const [postOrderItemRow] = await db.query(insertquery2, [values]);
      console.log(
        "insertOrderItem 메서드 진입 33333333333333333333333333333: ",
        insertOrderItem
      );
      return postOrderItemRow;
    }

    //console.log("uuid() 222222222222222 : " + uuid());
    console.log("insertValArr1.order_id : " + insertValArr1.order_id);
    var insertquery1 = "INSERT INTO orders SET ?"; // 주문내역
    return new Promise((resolve, reject) => {
      db.query(insertquery1, insertValArr1, function (error, results) {
        if (error) {
          console.log("insert error insertquery1 : ", insertquery1);

          reject(error);
        } else {
          console.log("insert success insertquery1 : ", insertquery1);

          resolve(results);
        }
      });
    });

    /*
    var insertquery2 =
      "INSERT INTO 'order_item'('order_id','item_id','quantity') values ?;"; // 주문내역물품정보
    return new Promise((resolve, reject) => {
      db.query(insertquery2, [insertValArr_list], function (error, results) {
        console.log("insertValArr_list : ", insertValArr_list);
        if (error) {
          console.log("insert error insertquery2 : ", insertquery2);
          reject(error);
        } else {
          console.log("insert success insertquery2 : ", insertquery2);
          resolve(results);
          // if ((item_index = item.length - 1)) {
          //   console.log("item_index(if) == ", item_index);
          //   resolve(results);
          // } else {
          //   console.log("item_index(else) == ", item_index);
          // }
        }
      });
    });
    */
    /*
      item_id_list.push(item[item_index].id);
      quantity_list.push(item[item_index].quantity);
      
      //가장 배송일이 늦는 아이템 조회 쿼리 작성중
      const findquery = `select expected_delivery from item where item_id='${item[item_index].id}'`;
      console.log("findquery: ", findquery);
      db.query(findquery, function (err, row) {
        if (err) {
          reject(err);
        } else {
          //if (max_num_temp > parseInt(row[0].expected_delivery)) {
          if (max_num_temp > row[0].expected_delivery) {
            last_delivery_item_id = item_id_list[max_num_temp];
            last_delivery_item_quantity = quantity_list[max_num_temp];
          } else {
            console.log(
              "======================= type mismatch calculate error(else) ==========================="
            );
            console.log("max_num_temp : ", max_num_temp);
            console.log(
              "row[0].expected_delivery : ",
              row[0].expected_delivery
            );
            max_num_temp = row[0].expected_delivery;
            console.log("max_num_temp : ", max_num_temp);
            console.log("item_index : ", item_index);
            last_delivery_item_id = item_id_list[max_num_temp];
            last_delivery_item_quantity = quantity_list[max_num_temp];
            console.log("last_delivery_item_id : ", last_delivery_item_id);
            console.log(
              "last_delivery_item_quantity : ",
              last_delivery_item_quantity
            );
          }
        }
      });
      */

    //const last_delivery_item_id = "";
    // const last_delivery_item_id = item_id_list[max_num_temp];
    // console.log("last_delivery_item_id : ", last_delivery_item_id);
    // console.log("item_id_list[max_num_temp] : ", item_id_list[max_num_temp]);
    // console.log("max_num_temp : ", max_num_temp);
    // const last_delivery_item_quantity = quantity_list[max_num_temp];
    // console.log("last_delivery_item_quantity : ", last_delivery_item_quantity);
    // console.log("quantity_list[max_num_temp] : ", quantity_list[max_num_temp]);
    // console.log("max_num_temp : ", max_num_temp);
    //let item_id_list_data = JSON.stringify(item_id_list);
    //let quantity_list_data = JSON.stringify(quantity_list);
  }

  //수정

  //삭제
  static async deleteOrder(order_id) {
    console.log("orderService.deleteOrder(order_id): ", order_id);
    return new Promise((resolve, reject) => {
      const deletequery1 = `DELETE FROM ${table_name} WHERE order_id = '${order_id}'`; // orders 데이터삭제
      const deletequery2 = `DELETE FROM order_item WHERE order_id = '${order_id}'`; // order_item 데이터삭제
      //var deletequery2 = "DELETE FROM order_item WHERE order_id = ? "; // 주문내역물품정보
      db.query(deletequery2, function (error, results) {
        if (error) {
          console.log("delete error deletequery2 : ", deletequery2);
          reject(error);
        } else {
          console.log("delete success deletequery2 : ", deletequery2);
          //resolve(results);
        }
      });
      db.query(deletequery1, function (error, results) {
        if (error) {
          console.log("delete error deletequery1 : ", deletequery1);

          reject(error);
        } else {
          console.log("delete success deletequery1 : ", deletequery1);

          resolve(results);
        }
      });
    });
  }
}
export { orderService };
