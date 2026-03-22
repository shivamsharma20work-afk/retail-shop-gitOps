pipeline {
    agent any

    environment {
        AWS_REGION= "ap-south-1"
        ACCOUNT_ID= "288096932508"
        REPO_NAME= "dockerimage-repo"

        IMAGE_BACKEND= "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:backend"
        IMAGE_FRONTEND= "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:frontend"
    }

    stages{   
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t retail-backend ./backend'
                sh 'docker build -t retail-frontend ./frontend'
            }
        }
        stage('Login to ECR') {
            steps{
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials-id',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com'
                }
            }        
        }
        stage('Push Docker Image to ECR') {
            steps {
                sh 'docker tag retail-backend ${IMAGE_BACKEND}'
                sh 'docker tag retail-frontend ${IMAGE_FRONTEND}'
                sh 'docker push ${IMAGE_BACKEND}'
                sh 'docker push ${IMAGE_FRONTEND}'
            }
        }
    }
}