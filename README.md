# HttpServer


For Local network communication

서버의 시작은 다음과 같다.

node Httpserver.js

포트는 10000 으로 실행된다.

호출은 http://<ip:10000>/method


현제 시스템에 대한 정보는 conf 디렉터리에 저장되어 있으며

config.json 에는 현제 batu 시스템에 대한 정보가 담겨있으며,

host_config.json 에 host 속성이 담겨있다. 현제 그룹에 속해있는지, 마스터인지 슬레이브인지,  담겨있으며

host_config_ex2.json 에는 mater 의 예시를 담았다. ( 예시 파일일 뿐 실제로는 host_config.json 만 사용된다)



## API

### 1. get: /common/config


설명:

	/conf/config.json 파일을 읽어와 받아온다.

인자:
	
	없음

응답:

	성공:
	
	code: 200 body: JSON TEXT {"nickname":"","batu":true}
	
	실패:

	code: not 200 body: JSON TEXT. {"message":"사유" }


### 2. GET: /common/vm/list


설명:

	현제 BATU 시스템에 등록된 VM 리스트를 받아온다.	

인자:
	
	없음

응답:

	성공:
	
	code: 200 body: JSON ARRAY TEXT [ {"id":"ID" "nickname":"닉네임", "cpu_physical_core":"물리코어 개수" , "cpu_virtual_core":"가상코어 개수", "main_memory":"렘 메모리","disk_memory":"하드디스크 메모리","start_command":"시작 커멘드"}, { ...생략... }, { ...생략... }  ]
	
	실패:
	
	code: not 200 body: JSON TEXT {"message":"사유"}

### 3. POST: /common/vm/add

설명:

	VM을 추가한다.

인자:
	
	data: JSON TEXT {"nickname":"닉네임", "cpu_physical_core":"물리코어 개수" , "cpu_virtual_core":"가상코어 개수", "main_memory":"렘 메모리","disk_memory":"하드디스크 메모리","start_command":"시작 커멘드"}


응답:

	성공:

	code: 200 body: JSON TEXT {"message":"ok"}

	실패:

	code: not 200 body: JSON TEXT {"message":"사유"}

### 4. POST: /common/vm/control

설명:

	해당 머신에서 명령어를 실행한다. (보안적 이슈 있음)

인자:
	
	data: "실행할 커멘드"

응답:

	성공:

	code: 200 body: JSON TEXT { "message":"ok" }
	
	실패:

	code: not 200 body: JSON TEXT {"message":"사유"}


### 5. GET: /common/vm/stats

설명:

/conf/config.json 파일을 읽어와 받아온다.

인자:
	
	vm_id: vm의 ID

응답:

	성공:
	
	code:200 body: JSON TEXT { 미정 - vm 담당이랑 논의 필요  }
	
	실패:
	
	code: not 200 body: JSON TEXT {"message":"사유"}

### 6. POST: /master/group/json

설명:

	요청한의 ip를 마스터 pc의 그룹 데이터베이스에 저장
	
인자:
	
	없음


응답:

	성공:

	code: 200 body: JSON TEXT {"message":"ok"}

	실패:

	code: not 200 body: JSON TEXT {"message":"사유"}

### 7. GET: /master/group/list

설명:

	요청한 쪽이 마스터일경우 마스터 그룹의 ip리스트를 json 형태로 반환

인자:
	
	없음

응답:

	성공:
	
	code: 200 body: JSON ARRAY TEXT { "master":"master-ip", "member":[ { "address":"member address" }, ...생략... ] }
	
	실패: 

	code: note 200 body: { "message":"사유" }

### 8. GET: /slave/group/my/master

설명:

	자신이 slave(member) batu라면 자신이 속한 그룹의 master ip를 반환한다.

인자:
	
	없음

응답:

	성공:
	
	code: 200 body: JSON ARRAY TEXT  { "master":"master  address" }
	
	실패: 

	code: note 200 body: { "message":"사유" }




