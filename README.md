# 디지몬, 나의 선택받은 문장은?!

디지몬 어드벤처의 8개 문장 콘셉트로 만든 한국어 심리검사 웹앱입니다. 질문에 답하면 용기, 우정, 순수, 사랑, 지식, 성실, 희망, 빛 중 가장 가까운 문장을 결과로 보여줍니다.

## 접근 URL

- Production: https://crest-psych-test.vercel.app
- GitHub: https://github.com/mypace0600/crest-psych-test

## 주요 기능

- 8문항 한국어 문장 심리검사
- 마지막 질문 가중치 기반 동점 처리
- 결과 공유 링크 생성
- 사용자별 UUID 기반 공유 URL 지원
- Supabase 연결 시 공유 결과 저장 가능
- 결과 이미지 PNG 저장
- 저장 이미지에 문장별 반응 포함
- 문장별 선택받은 아이 캐릭터 이미지 표시
- 애니원 동아리 소개 팝업 및 활동 사진 자동 슬라이드
- SEO/Open Graph 메타데이터 설정

## 기술 스택

- Next.js 14
- React 18
- TypeScript
- Supabase
- Vercel
- html-to-image

## 로컬 실행

Node.js 20.x 기준입니다.

```bash
npm install
npm run dev
```

로컬 주소:

```text
http://localhost:3000
```

## 빌드

```bash
npm run build
npm run start
```

## Supabase 설정

Supabase를 연결하면 공유 결과를 서버에 저장할 수 있습니다. 환경변수와 테이블 스키마는 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)를 참고하세요.

Supabase가 설정되지 않은 경우에도 앱은 동작하며, 공유 URL은 `?u=<uuid>&result=<crest>` 형태의 fallback을 사용합니다.

## 배포

Vercel 프로젝트에 연결되어 있으며 프로덕션 배포는 다음 명령으로 진행합니다.

```bash
npx vercel --prod --yes
```

배포 완료 후 production alias는 다음 주소로 연결됩니다.

```text
https://crest-psych-test.vercel.app
```
