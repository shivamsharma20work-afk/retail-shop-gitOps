pipeline {
    agent any

    stages{
        stage('Code') {
            steps{
                git url:"https://github.com/shivamsharma20work-afk/retail-shop-gitOps", branch: "main"
            }
        }
        stage('Build backend') {
            steps{
                sh 'whoami'
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
        stage('Deploying to Docker Hub') {
            steps{
                echo 'Pushing this Image to Docker Hub'
                withCredentials([usernamePassword('credentialsId': "dockerHubCred" ,
                passwordVariable:"dockerHubPass",
                usernameVariable:"dockerHubUser")]){
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                sh 'docker image tag retail-backend shivam011/retail-backend'
                sh 'docker image tag retail-frontend shivam011/retail-frontend'
                sh 'docker push ${dockerHubUser}/retail-backend'
                sh 'docker push ${dockerHubUser}/retail-frontend'
                }
            }
        }
        stage('Deploy') {
            steps{
                sh 'docker run -d --name backend  -p 5000:5000 retail-backend'
                sh 'docker run -d --name frontend -p 80:80 retail-frontend'
            }
        }
    }
}

