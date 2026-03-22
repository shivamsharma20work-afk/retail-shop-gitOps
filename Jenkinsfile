pipeline {
    agent any

    environment {
        AWS_REGION= "ap-south-1"
        ACCOUNT_ID= "288096932508"
        REPO_NAME= "dockerimage-repo"
        TAG = "latest"
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
        stage('Tag & Push Images') {
            steps {
                sh '''
                # Backend tagging
                docker tag retail-backend $IMAGE_BACKEND

                # Frontend tagging
                docker tag retail-frontend $IMAGE_FRONTEND

                # Push Backend
                docker push $IMAGE_BACKEND

                # Push Frontend
                docker push $IMAGE_FRONTEND
                '''
            }
        }
        stage('Update K8s Deployment Files') {
            steps{
                sh '''
                # Replace image in Frontend Deployment
                sed -i "s|image:.*frontend.*|image : $IMAGE_FRONTEND|g" k8s/frontend-k8s/deployment.yml

                # Replace image in Backend Deployment
                sed -i "s|image:.*backend.*|image : $IMAGE_BACKEND|g" k8s/backend-k8s/deployment.yml
                '''
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([string(credentialsId: 'k8s-token', variable: 'K8S_TOKEN')]) {
                    sh '''
                    kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/namespace.yml

                    kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/secrets.yml

                    kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/backend-k8s/

                    kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/frontend-k8s/

                            kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/ingress.yml

                    kubectl \
                        --server=https://192.168.49.2:8443 \
                        --token=$K8S_TOKEN \
                        --insecure-skip-tls-verify=true \
                        apply -f k8s/hpa.yml
                    '''
            }
        }
        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl get pods -n retail-app
                kubectl get svc -n retail-app
                kubectl get hpa -n retail-app
                '''
                }
            }
        }
    }
}