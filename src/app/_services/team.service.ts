import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

    profiles = [
        {
            id: 1,
            image: 'assets/images/bio-images/eduardo-bio-image.jpeg',
            name: 'Eduardo Campos',
            position: 'CEO',
            skills: [ 'Founder and Managing Director', 'CEO', 'Husband and father' ],
            location: 'Queretaro, Queretaro',
            facebook: '',
            github: '',
            linkedin: '',
            twitter: '',
            skype: '',
            website: '',
            greenDescription: `A seasoned executive, President, CEO and founder of ScreenIT and Zourcing.
                                I have been in the IT-HR outsourcing market for more than 20 years now;
                                working for Fortune 500 companies. Throughout the years,
                                I have successfully launched and managed nearshore operations for multiple medium-sized
                                and large enterprises from US, LATAM, and Europe (five-1300 employees).`,
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        },
        {
            id: 2,
            image: 'assets/images/bio-images/jessica-bio-image.jpeg',
            name: 'Jessica Aguado',
            position: 'Director of Product Development',
            skills: [ 'Customer Care', 'Business and International Trade' ],
            location: 'Queretaro, Queretaro',
            facebook: '',
            github: '',
            linkedin: '',
            twitter: '',
            skype: '',
            website: '',
            greenDescription: `Results-oriented, creative and enthusiastic, I like to share experiences and
                               learn new ones from people working around me. International business has made
                               who I am, thanks to the opportunities of collaborating with awesome minds in
                               Sillicon Valley and now in Mexico.`,
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        },
        {
            id: 3,
            image: 'assets/images/bio-images/juana-bio-image.jpg',
            name: 'Juana Martinez',
            position: 'CTO',
            skills: [ 'Leadership', 'Management', 'Development' ],
            location: 'Monterrey, Mexico',
            facebook: 'https://www.facebook.com/juanamtz',
            github: 'https://github.com/juanamtz1982',
            linkedin: 'https://www.linkedin.com/in/jmdllmc/',
            twitter: 'https://twitter.com/JuanyDelosLagos',
            skype: '',
            website: '',
            greenDescription: 'Description test',
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        },
        {
            id: 4,
            image: 'assets/images/bio-images/gustavo-bio-image.jpeg',
            name: 'Gustavo Reyes',
            position: 'Back End Developer',
            skills: [ 'Python', 'Django' ],
            location: 'Monterrey, Mexico',
            facebook: '',
            github: '',
            linkedin: '',
            twitter: '',
            skype: '',
            website: '',
            greenDescription: 'Description test',
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        },
        {
            id: 5,
            image: 'assets/images/bio-images/adrian-bio-image.png',
            name: 'Adrian Tobon',
            position: 'Front End Developer',
            skills: [ 'Angular', 'Typescript', 'NodeJS' ],
            location: 'Monterrey, Mexico',
            facebook: 'https://www.facebook.com/adrian.tobong',
            github: 'https://github.com/adriantobon',
            linkedin: 'https://www.linkedin.com/in/adriantobon/',
            twitter: 'https://twitter.com/adriantobon',
            skype: '',
            website: '',
            greenDescription: 'Description test',
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        },
        {
            id: 6,
            image: 'assets/images/bio-images/ricardo-bio-image.png',
            name: 'Ricardo Meza',
            position: 'Front End Developer',
            skills: [ 'Angular', 'Typescript', 'Ionic' ],
            location: 'Nayarit, Mexico',
            facebook: '',
            github: '',
            linkedin: '',
            twitter: '',
            skype: '',
            website: '',
            greenDescription: 'Description test',
            workexperience: [
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                },
                {
                    title: 'Work experience title',
                    description: 'Work experience description'
                }
            ]
        }
    ]
}