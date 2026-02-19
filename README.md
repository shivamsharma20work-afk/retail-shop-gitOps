<h1>🚀 CloudCart: Production-Grade GitOps Pipeline</h1>


<h2>🌟 Overview</h2>
<p>CloudCart is a microservices-based retail application (Frontend: React, Backend: Node.js) deployed using a modern DevOps stack. This project demonstrates a complete End-to-End Automation—starting from provisioning infrastructure on AWS to deploying the application using GitOps principles.</p>

<h2>🏗️ Technical Architecture</h2>
The project follows a modular and scalable architecture:

<b>Infrastructure (IaC)</b>: Automated AWS provisioning (VPC, EKS, Subnets) using Terraform.

<b>Continuous Integration (CI)</b>: Jenkins pipeline automates code checkout, Docker image building, and pushing to Docker Hub.

<b>Continuous Deployment (CD)</b>: ArgoCD implements GitOps by syncing the Kubernetes manifests from GitHub to the AWS EKS cluster.

<b>Security</b>: IAM roles for EKS and secure credential management via Jenkins.

<h2>🛠️ Tech Stack & Tools</h2>

<b>Cloud</b>: AWS (Elastic Kubernetes Service - EKS)


<b>IaC</b>: Terraform (Modular Setup: main.tf, variables.tf, provider.tf, outputs.tf)

<b>CI/CD</b>: Jenkins & ArgoCD

<b>Containers</b>: Docker

<b>Orchestration</b>: Kubernetes (K8s)

<b>Networking</b>: VPC, Private/Public Subnets, LoadBalancer

<h2>🚀 The Pipeline Flow</h2>
<b>Code Push</b>: Developer pushes code to the main branch.

<b>Jenkins Trigger</b>: Jenkins detects changes (Poll SCM/Webhooks).

<b>Infra Check</b>: Jenkins runs terraform plan to validate the AWS infrastructure.

<b>Build & Push</b>: Jenkins builds Docker images for Frontend & Backend and pushes them to Docker Hub (shivam011/retail-*).

<b>GitOps Sync</b>: ArgoCD detects the new image/manifest and automatically updates the EKS Cluster.

<h2>💡 Key Features</h2>
<b>Zero-Touch Deployment</b>: Once code is pushed, the entire flow from build to cloud deployment is automated.

<b>Infrastructure Consistency</b>: Terraform ensures that the AWS environment is reproducible and version-controlled.

<b>Self-Healing</b>: Kubernetes and ArgoCD ensure the desired state of the application is always maintained.

<h3>👨‍💻 Author <hr>
Shivam Sharma <br>
DevOps Enthusiast | Cloud Architect</h3>