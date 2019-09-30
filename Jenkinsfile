pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm --version'
      }
    }
  }
  tools {
    nodejs '10.16.3'
  }
  environment {
    test = '1'
  }
}