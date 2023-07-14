import {Config} from "../_helpers/config";

export class Constants {
    // public static HOST = 'sandbox-api.zourcing.com/'
    public static HOST = Config.getEnvironmentVariable('endPoint');
    public static HTTP_SCHEME = 'https://';
    public static WS_SCHEME = 'wss://';
    public static HTTP_ENDPOINT = Constants.HTTP_SCHEME + Constants.HOST;
    public static WS_ENDPOINT = Constants.WS_SCHEME + Constants.HOST;
    public static API_ENDPOINT = Constants.HTTP_ENDPOINT + 'api/';
    public static WS_API_ENDPOINT = Constants.WS_SCHEME + Constants.HOST + 'api/';
    public static FACEBOOK_APP_ID = '1099303473510587';
    public static OPENPAY_ID = 'm0c2dpz8urpiufh80657';
    public static OPENPAY_PUBLIC_KEY = 'pk_dc3ce07d50574c078e4010cbce001790';
    public static CLIENT_ID = 'jsS5zn8IMoLdyVaPhXdO6Wa7StGJOlo7dVZXUSgG';
    public static CLIENT_SECRET = 'WSQGMnA3Fp58mgwxcfFqW5s8brRiHfofDmQIp8BrzG4fnfJonOLELUc3yGwyXTnjbY2bvNe3kf5ppXD85KmeUUKNIyfr2BCfIhUBZpoT0yrvLaeJ0O20d66cfQQ2P6gD'
    public static GITHUB_CLIENT_ID = '95f76ad1481e2251115d'
    public static GITHUB_CLIENT_SECRET = '62688b682db55568e5dd9fa1aa3862078339950a'
    public static LINKEDIN_ENDPOINT = 'http://localhost:8080/api/';
}

