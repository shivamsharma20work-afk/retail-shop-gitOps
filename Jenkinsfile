pipeline {
    agent any

    environment {
        AWS_REGION= "ap-south-1"
        ACCOUNT_ID= "288096932508"
        REPO_NAME= "dockerimage-repo"
        BUILD_TAG = "${BUILD_NUMBER}"

        IMAGE_BACKEND= "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:backend-${BUILD_TAG}"
        IMAGE_FRONTEND= "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:frontend-${BUILD_TAG}"

    }

    stages{   
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t retail-backend ./backend'
                sh 'docker build -t retail-frontend ./frontend'
            }
        }
        stage('Login to AWS ECR') {
            steps{
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials-id',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh 'aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com'
                }
            }        
        }
        stage('Tag & Push Images') {
            steps {
                sh '''
                # tagging
                docker tag retail-backend $IMAGE_BACKEND
                docker tag retail-frontend $IMAGE_FRONTEND

                # Push Backend
                docker push $IMAGE_BACKEND

                # Push Frontend
                docker push $IMAGE_FRONTEND
                '''
            }
        }
        stage('Update GitOps Repo') {
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                sh '''
                sed -i "s|image:.*frontend.*|image : $IMAGE_FRONTEND|g" k8s/frontend-k8s/deployment.yml
                sed -i "s|image:.*backend.*|image : $IMAGE_BACKEND|g" k8s/backend-k8s/deployment.yml

                git config user.name "jenkins"
                git config user.email "jenkins@example.com"

                git add .
                git commit -m "Update images to build ${BUILD_NUMBER}"

                git push https://${GIT_USER}:${GIT_PASS}@github.com/shivamsharma20work-afk/retail-shop-gitops.git HEAD:main 
                '''
                }

            }
        }
        stage('Verify Deployment') {
            steps {
                    sh '''
                    echo "Deployment triggered via ArgoCD
                    '''
            }
        }
    }
}
