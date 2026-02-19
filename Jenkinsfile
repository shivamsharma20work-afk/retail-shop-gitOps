pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "shivam011/retail-backend"
        FRONTEND_IMAGE = "shivam011/retail-frontend"
    }

    stages {
        stage('Code Checkout') {
            steps {
                git url: "https://github.com/shivamsharma20work-afk/retail-shop-gitOps", branch: "main"
            }
        }

        stage('Terraform Plan') {
            steps {
                // Bhai, yahan teri AWS ki chabi lagegi
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'aws-credentials-id', 
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir('terraform') {
                        echo 'AWS Infrastructure check ho raha hai... ☁️'
                        sh 'terraform init'
                        sh 'export AWS_DEFAULT_REGION=ap-south-1 && terraform plan'
                    }
                }
            }
        }

        stage('Build Images') {
            steps {
                echo 'Docker images build ho rahi hain... 🛠️'
                sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
            }
        }

        stage('Pushing to Docker Hub') {
            steps {
                echo 'Images Docker Hub par bhej raha hoon... 🚀'
                withCredentials([usernamePassword(credentialsId: "dockerHubCred", 
                                 passwordVariable: "dockerHubPass", 
                                 usernameVariable: "dockerHubUser")]) {
                    
                    sh "echo ${dockerHubPass} | docker login -u ${dockerHubUser} --password-stdin"
                    
                    // Sidha push kar rahe hain kyunki humne build ke waqt hi sahi naam diya tha
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Local images saaf kar raha hoon... 🧹'
                sh "docker rmi ${BACKEND_IMAGE}:latest ${FRONTEND_IMAGE}:latest || true"
            }
        }
    }

    post {
        success {
            echo 'Bhai, Jenkins ka kaam khatam! Terrafrom Plan aur Docker Push dono success hain. 🎉'
        }
        failure {
            echo 'Pipeline fail ho gayi. Console output check kar lo! ❌'
        }
    }
}