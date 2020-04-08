import { createProxy } from 'next-tinacms-github';

const GITHUB_ACCESS_TOKEN_COOKIE_KEY = 'github_access_token';

export default createProxy(GITHUB_ACCESS_TOKEN_COOKIE_KEY);
