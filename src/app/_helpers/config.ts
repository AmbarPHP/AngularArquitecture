export class Config {
    
        public static getEnvironmentVariable(value) {
            var environment: string;
            var data = {};
            environment = window.location.hostname;
            switch (environment) {
                case 'localhost':
                    data = {
                        endPoint: 'localhost:8018/'
                    };
                    break;
                case '127.0.0.1':
                    data = {
                        endPoint: '127.0.0.1:8018/'
                    };
                    break;
                case 'sandbox.zourcing.com':
                    data = {
                        endPoint: 'sandbox-api.zourcing.com/'
                    };
                    break;
                case 'www.sandbox.zourcing.com':
                    data = {
                        endPoint: 'sandbox-api.zourcing.com/'
                    };
                    break;
                case 'staging.zourcing.com':
                    data = {
                        endPoint: 'staging-api.zourcing.com/'
                    };
                    break;
                case 'www.staging.zourcing.com':
                    data = {
                        endPoint: 'staging-api.zourcing.com/'
                    };
                    break;
                case 'app.zourcing.com':
                    data = {
                        endPoint: 'api.zourcing.com/'
                    };
                    break;
                case 'www.app.zourcing.com':
                    data = {
                        endPoint: 'api.zourcing.com/'
                    };
                    break;
                case '35.163.205.216':
                    data = {
                        endPoint: '35.163.205.216/'
                    };
                    break;
    
            }
            return data[value];
        }
    }