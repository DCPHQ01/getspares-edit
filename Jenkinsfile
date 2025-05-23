pipeline {
    agent any

    environment {
        EMAILS = 'joshua.o@semicolon.africa,ibrahim@semicolon.africa,emmanuel.e@semicolon.africa,prince@semicolon.africa,ashleyndabai@gmail.com,olawamidemoyinoluwamary@gmail.com,Ikennajames03@gmail.com,precious@semicolon.africa,asuelimenblessing630@gmail.com,Enubiakjoseph@gmail.com,henryokafor.dev@gmail.com,Paulineyahla@gmail.com'
        SMTP_SERVER = 'smtp.semicolon.africa'
        SMTP_PORT = 465
        SMTP_USERNAME = 'builds@semicolon.africa'
    }

    triggers {
        githubPush() // GitHub hook trigger for GITScm polling
    }

    stages {
        stage('Print Environment Variables') {
            steps {
                script {
                    // Print all environment variables for debugging
                    sh 'printenv'
                }
            }
        }

        stage('Check Node.js Version') {
            steps {
                script {
                    // Print Node.js version
                    sh 'node -v'
                    
                    // Print npm version
                    sh 'npm -v'
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // Checkout code with PAT credentials
                    checkout([$class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[url: 'https://github.com/me-ca/e-meca-next-frontend.git', credentialsId: 'githubcred']]
                    ])
                    env.BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    echo "Current Branch Name: ${env.BRANCH_NAME}"
                }
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Setup Node.js
                    tool name: 'nodejs-20', type: 'NodeJSInstallation'
                    echo "Using Node.js version: ${tool name: 'nodejs-20', type: 'NodeJSInstallation'}"

                    // Verify Node.js and npm versions
                    sh 'node -v'
                    sh 'npm -v'

                    // Install dependencies
                    sh 'npm install --force'

                    // Check for errors in `npm install` command
                    echo "Completed npm install"

                    // Lint the code
                    sh 'npm run lint'
                    echo "Linting completed"

                    // Build
                    sh 'npm run build'
                    // Check for errors in `npm run build` command
                    echo "Build completed"

                    // Run tests
                    sh 'npm test'
                    // Check for errors in `npm test` command
                    echo "Tests completed"

                    // Set environment variables
                    def TIMESTAMP = sh(script: 'date +%Y%m%d%H%M%S', returnStdout: true).trim()
                    def COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.TAG = "commit-${COMMIT_HASH}-timestamp-${TIMESTAMP}"
                    env.JAR_NAME = "myapp-${TAG}.jar"
                    env.COMMIT_TITLE = sh(script: 'git log -1 --pretty=%s', returnStdout: true).trim()
                    env.COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.COMMIT_AUTHOR = sh(script: 'git log -1 --pretty=format:\'%an <%ae>\'', returnStdout: true).trim()
                    
                    echo "Commit Details:"
                    echo "Title: ${env.COMMIT_TITLE}"
                    echo "Message: ${env.COMMIT_MESSAGE}"
                    echo "Author: ${env.COMMIT_AUTHOR}"
                    echo "Tag: ${env.TAG}"
                }
            }
        }

        stage('Send Build Notifications') {
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

                            writeFile file: '/tmp/email.txt', text: emailContent

                            sh """
                                curl --url "smtps://${env.SMTP_SERVER}:${env.SMTP_PORT}" \\
                                   --mail-from "${env.SMTP_USERNAME}" \\
                                   --mail-rcpt "$email" \\
                                   --user "${env.SMTP_USERNAME}:${SMTP_PASSWORD}" \\
                                   --upload-file /tmp/email.txt \\
                                   --insecure
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
                echo "Branch Name: ${env.BRANCH_NAME}"
            }
        }
    }
}
