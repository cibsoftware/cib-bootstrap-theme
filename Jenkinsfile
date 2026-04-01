#!groovy

@Library('cib-pipeline-library@master') _

import de.cib.pipeline.library.Constants
import de.cib.pipeline.library.ConstantsInternal

standardNPMPipeline(
    primaryBranch: 'main',
    // Publish configuration
    npmAllowRepublish: true,
    npmCredentialsId: Constants.CIBSEVEN_NPM_CREDENTIALS_ID,
    npmDevRegistry: Constants.CIBSEVEN_NPM_REGISTRY_DEV_URL,
    npmReleaseRegistry: Constants.CIBSEVEN_NPM_REGISTRY_RELEASE_URL
)