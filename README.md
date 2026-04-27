HmPrm Client(Native)


# 개요 

본 문서는 **HmPrm 클라이언트 앱**에 관한 문서입니다.


## 앱의 실행 및 생성 

앱의 실행 및 APK/Bundle의 생성은 다음과 같은 명령을 이용하여 시작할수 있습니다. 

### For Android


```bash
# debug 
npm run android

# Development 
npm run android:dev

# Staging
npm run android:stg

# Production
npm run android:prd

# Production APK 생성 
npm run android:assemble:prd

#  Production Bundle 생성 : 출력폴더로 이동하여 파일을 선택한후 플레이스토어에 올리면 됩니다.
npm run android:bundle:prd

```

### For iOS

IOS는 스키마를 이용하여 빌드합니다.

```bash
# Development 
npm run ios:dev

# Staging 
npm run ios:stg

# Prodction 
npm run ios:prd

# 골퍼/캐디 앱스토어 배포 
XCODE를 이용하여 앱스토어 빌드및 업로드처리 : 스키마(Prd)를 선택하고 메뉴에서 
Product > Archive를 선택하여 업로드한다.


```

