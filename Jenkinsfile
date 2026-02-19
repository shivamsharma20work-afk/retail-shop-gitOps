pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "shivam011/retail-backend"
        FRONTEND_IMAGE = "shivam011/retail-frontend"
    }

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
                sh 'docker build -t ${BACKEND_IMAGE} ./backend'
            }
        }
        stage('Build frontend') {
            steps{
                echo 'Building the frontend code'
                sh 'docker build -t ${FRONTEND_IMAGE} ./frontend'
            }
        }
        stage('Pushing to Docker Hub') {
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
        stage('Cleanup') {
            steps{
               sh "docker rmi ${BACKEND_IMAGE}:latest ${FRONTEND_IMAGE}:latest || true"
            }
        }
    }

    post {
        success {
            echo 'Docker Images Pushed to Docker Hub Successfully'
        }
        failure {
            echo 'Error'
        }
    }
}


