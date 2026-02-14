pipeline{
    agent any

    stages{
        stage('Code') {
            steps{
                git url:"https://github.com/shivamsharma20work-afk/retail-shop-gitOps", branch: "main"
            }
        }
        stage('Build backend') {
            steps{
                echo 'Building the backend code'
                sh 'docker build -t retail-backend ./backend'
            }
        }
        stage('Build frontend') {
            steps{
                echo 'Building the frontend code'
                sh 'docker build -t retail-frontend ./frontend'
            }
        }
        stage('Test') {
            steps{
                echo 'Testing the code'
            }
        }
        stage('Deploy') {
            steps{
                echo 'Deploying the code'
                sh 'docker run -d -p 5000:5000 retail-backend'
                sh 'docker run -d -p 80:80 retail-frontend'
            }
        }
    }
}