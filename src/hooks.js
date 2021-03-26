import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';
export async function prepare(incoming) {
	const cookies = cookie.parse(incoming.headers.cookie || '');
  let cookie2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjhjNmY5MTM5LTJmMWMtNDhmMS1iOGE2LTE2YjhlZjVmMTQyYiIsImlhdCI6MTYxNjQ4MDk5OCwiZXhwIjoxNjE2NDg0NTk4fQ.wZR9yjn2RugBn-xcLEWn2A7RwWFn-kLNmW_Yjyd5NRw'
  console.log(jwt.decode(cookie2))
	const headers = {};
	if (!cookies.session_id) {
    console.log('no cookie :((')
		//headers['set-cookie'] = `session_id=${uuid()}; HttpOnly`;
	}

	return {
		headers
	};
}

export function getSession({ context }) {
	return {
		
	};
}