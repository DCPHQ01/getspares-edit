pipeline {
    agent any

    environment {
        EMAILS = 'joshua.o@semicolon.africa,ibrahim@semicolon.africa,emmanuel.e@semicolon.africa,prince@semicolon.africa,ashleyndabai@gmail.com,olawamidemoyinoluwamary@gmail.com,Ikennajames03@gmail.com,precious@semicolon.africa,asuelimenblessing630@gmail.com,Enubiakjoseph@gmail.com,henryokafor.dev@gmail.com,Paulineyahla@gmail.com'
        SMTP_SERVER = 'semicolon.africa'
        SMTP_PORT = 465
        SMTP_USERNAME = 'builds@semicolon.africa'
        SMTP_PASSWORD = '6xbZJUw&0coHCoB'
    }

    stages {
        stage('Build and Test') {
            when {
                branch 'main'
            }

            steps {
                script {
                    // Checkout code
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/me-ca/e-meca-next-frontend.git']]])

                    // Setup Node.js
                    tool name: 'nodejs-20', type: 'NodeJSInstallation'

                    // Install dependencies
                    sh 'npm install --force'

                    // Build
                    sh 'npm run build'

                    // Set environment variables
                    def TIMESTAMP = sh(script: 'date +%Y%m%d%H%M%S', returnStdout: true).trim()
                    def COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def TAG = "commit-${COMMIT_HASH}-timestamp-${TIMESTAMP}"
                    env.TAG = TAG
                    env.JAR_NAME = "myapp-${TAG}.jar"
                    env.BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.COMMIT_TITLE = sh(script: 'git log -1 --pretty=%s', returnStdout: true).trim()
                    env.COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.COMMIT_AUTHOR = sh(script: 'git log -1 --pretty=format:\'%an <%ae>\'', returnStdout: true).trim()
                }
            }
        }

        stage('Send build notifications') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SMTP_PASSWORD', variable: 'SMTP_PASSWORD')]) {
                        def emails = env.EMAILS.split(',')
                        def subject = currentBuild.result == 'SUCCESS' ? 'Build and Deployment Status' : 'Build Failure'
                        def message = currentBuild.result == 'SUCCESS' ? "Congratulations, your recent build in Meca Frontend was successful." : "Oooops, Your recent build in Meca Frontend was unsuccessful, kindly check the new commit and fix."

                        emails.each { email ->
                            def emailContent = """
                                From: ${env.SMTP_USERNAME}
                                To: $email
                                Subject: $subject
                                
                                $message
                                Branch: ${env.BRANCH_NAME}
                                Commit Title: ${env.COMMIT_TITLE}
                                Commit Message: ${env.COMMIT_MESSAGE}
                                Author: ${env.COMMIT_AUTHOR}
                                
                                TAG: ${env.TAG}
                                
                                Regards,
                                The Cloud Team
                            """.stripIndent()

                            sh "echo '$emailContent' > /tmp/email.txt"

                            sh """
                                curl --url "smtps://${env.SMTP_SERVER}:${env.SMTP_PORT}" \\
                                   --mail-from "${env.SMTP_USERNAME}" \\
                                   --mail-rcpt "$email" \\
                                   --user "${env.SMTP_USERNAME}:${env.SMTP_PASSWORD}" \\
                                   --upload-file /tmp/email.txt
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                def branchName = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                echo "Branch Name: ${branchName}"
            }
        }
    }
}
