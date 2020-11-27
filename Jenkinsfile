def archive_file = "immo-calc.tgz"

node('vprox') {
    stage('pulling code') {
        checkout scm
    }
    

    stage('Tarring tarball') {
        sh label: 'Making tarball', script: "tar cvzf ${archive_file} app.js sw.js index.html index.css "
    }
    stage('Archiving') {
        archiveArtifacts artifacts: "${archive_file}", defaultExcludes: false, followSymlinks: false, onlyIfSuccessful: true
    }
    stage('Deploy') {
        sh label: 'Untar', script: "mkdir /tmp/immo-calc/ && tar xvzf ${archive_file} -C /tmp/immo-calc"
        sh label: 'Deploy', script: "sudo sh -c \"rm -rf /var/www/https.bender42.freeboxos.fr/immo-calc && mv /tmp/immo-calc /var/www/https.bender42.freeboxos.fr/ && chown -R www-data:www-data /var/www/https.bender42.freeboxos.fr/immo-calc\""
    }
}