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
            }
        }
        stage('Build frontend') {
            steps{
                echo 'Building the frontend code'
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
            }
        }
    }
}