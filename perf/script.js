import http from 'k6/http';
import { sleep, check } from 'k6';

const email = __ENV.LOGIN_EMAIL;
const password = __ENV.LOGIN_PASSWORD;

export const options = {
    vus: 5,
    duration: '30s',
};

export default function () {
    const payload = JSON.stringify({ email, password });

    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'k6-load-test'
    };

    const res = http.post('https://owl-writey.hemit.fr/api/auth/loginAs', payload, { headers });

    console.log(`Status: ${res.status} | Body: ${res.body}`);

    check(res, {
        'status is 200': (r) => r.status === 200
    });

    sleep(1);
}