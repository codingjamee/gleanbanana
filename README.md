<img src="https://capsule-render.vercel.app/api?type=Rounded&color=f6e173&height=150&text=저탄소%20권장%20쇼핑몰%20서비스&section=header" />

### 서비스 명 : 저탄소에 반한 바나나


## 1. 실행방법 : 

```$ cd front ```  
```$ npm install ```  
```$ npm start ```


## 2. 프로젝트 설명:   

소비 전 과정에서 탄소가 발생이 되는데,   
그 중 탄소 배출량의 식품 소비 비율이 큽니다.  
친환경 식품 소비를 위해 소비자는 어떻게 해야할지 감이 잘 오지 않습니다.   
 탄소 배출량의 지표로 우리는 바나나 인덱스를 활용하였습니다.  
우리는 이 바나나 인덱스를 상품마다 표시하여  
탄소를 적게 배출하는 식품의 지표를 알게 하고  
친환경 소비를 유도한 쇼핑몰을 만들었습니다.   


- 바나나 인덱스란 :  

바나나 인덱스는 기후 영향과 영양가가 중간 정도인  
바나나를 기준으로 식품별 탄소 배출량을 정리한 지표입니다.  
본 프로젝트는 바나나 인덱스를 활용한 쇼핑몰 서비스로  
저탄소 식품 위주의 구매 환경을 마련하고자 합니다.  



## 3. 이 서비스의 주요 기능 (주된 활용성) 및 서브 기능 소개  

<img width="959" alt="Screenshot 2024-02-08 at 10 38 09 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/04499bdc-3505-4dfb-bd5e-71a2e11a2e50">
<img width="959" alt="Screenshot 2024-02-08 at 10 39 45 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/42fab800-2e4e-484e-b784-4f1ec1865972">



## 4. 기술 스택:  


   ### 프론트엔드
   
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">   <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">   <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">   <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white">   <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">   <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">  

  ### 백엔드
  
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>   <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>  
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"/>  


## 5. 사용한 라이브러리

-   #### 데이터분석
   pandas, matplotlib

-   #### 프론트엔드
   error-boundary, axios,
   
-   #### 백엔드
   express
   
-   #### 데이터셋  
   Banana Index, 1인 탄소 소비량  



-   #### 와이어프레임 링크 (예상 웹 화면 UI)  
   https://www.figma.com/file/tHwRJFb2W4CNIVcwuuwDMB/Glean-Code?type=design&node-id=0-1&mode=design&t=TynRabE2rxwhfw4E-0  
   
-   #### API 명세를 문서화한 링크  
   https://docs.google.com/spreadsheets/d/1Qvphl4MB4StnCNog7uPkcjRBRELTyvRVxiBkCFvOtZE/edit#gid=0  

   
 ## 6. 프로젝트 팀원 역할 분담  



   |이름|역할|
|------|----|
   |허제인| 팀장 / 프론트  |
   |박수진| 백엔드팀장 / 백엔드  |
   |정아영| 프론트  |
   |조영민| 백엔드|  
   |장재웅| 백엔드|  


## 7. 직접 구현한 기술 :   


Redux를 활용하여 한 페이지에 다양한 컴포넌트가   
렌더링 되어있는 장바구니의 복잡한 로직의  
상태관리를 구현하였습니다.   
사용자 장바구니 상태변경에 따른 과도한 Api요청을 막기 위해   
useDebouncing 훅을 활용하였습니다.  
Axios Interceptor에서 Jwt토큰 만료시 재발급 로직을 구현하였습니다.  
공통 컴포넌트 작성을 통해 재사용성을 확보 하였습니다.  
Sentry를 적용하여 실제 서비스 운용시 에러 디버깅을   
하고자 하였습니다.



## 8. 직접 구현한 기술 정리 이미지 :   

<img width="959" alt="Screenshot 2024-02-08 at 10 49 55 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/0400dd1e-a0a4-497f-abbb-3e35f0614da3">
<img width="959" alt="Screenshot 2024-02-08 at 10 50 03 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/1eb6059e-4340-4ef9-8a76-4453fd3963f6">
<img width="959" alt="Screenshot 2024-02-08 at 10 50 27 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/fab0e7ca-90e6-45b1-b4ed-8d3314687d7b">
<img width="959" alt="Screenshot 2024-02-08 at 10 50 33 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/01237223-bcde-4368-bf8c-493a4bf34946">
<img width="959" alt="Screenshot 2024-02-08 at 10 50 40 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/721892ab-c743-48ba-ab88-9c19c50490f2">
<img width="959" alt="Screenshot 2024-02-08 at 10 50 48 PM" src="https://github.com/codingjamee/gleanbanana/assets/99540667/d9f2f55f-14b6-4419-a6c5-dae9ba7cd8f2">

