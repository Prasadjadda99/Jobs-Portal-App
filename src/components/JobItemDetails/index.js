import {Component} from 'react'
import {BsStarFill, BsBriefcase, BsBoxArrowUpRight} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const jobDetailsConstraints = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    JobDetailsObject: {},
    similarJobs: [],
    apiStatus: jobDetailsConstraints.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: jobDetailsConstraints.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const fetchedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }

      const {jobDetails, similarJobs} = fetchedData
      const fetchedJob = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const similarJobsList = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        JobDetailsObject: fetchedJob,
        similarJobs: similarJobsList,
        apiStatus: jobDetailsConstraints.success,
      })
    } else {
      this.setState({
        apiStatus: jobDetailsConstraints.failure,
      })
    }
  }

  onfetchJobDetails = () => {
    this.getJobDetails()
  }

  renderJobDetailsSuccessView = () => {
    const {JobDetailsObject, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = JobDetailsObject

    return (
      <div>
        <Header />
        <div className="bg-container">
          <div className="job-item-container">
            <div className="job-profile-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="job-title-container">
                <h2 className="title">{title}</h2>
                <div className="rating-container">
                  <BsStarFill className="star-icon" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-location-type-container">
              <div className="loc-job-type">
                <div className="location-container">
                  <GoLocation />
                  <p>{location}</p>
                </div>
                <div className="job-type-container">
                  <BsBriefcase />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="job-role-details-container">
              <div className="job-description-container">
                <h3>Description</h3>
                <a href={companyWebsiteUrl}>
                  Visit
                  <BsBoxArrowUpRight />
                </a>
              </div>
              <p className="description">{jobDescription}</p>
              <h3>Skills</h3>
              <ul className="skills-container">
                {skills.map(eachSkill => (
                  <li className="skill">
                    <img
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                      className="skill-icon"
                    />
                    <p className="skill-name">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
              <div className="life-at-company-container">
                <h3>Life At Company</h3>
                <div className="life-at-company-description-container">
                  <p className="life-at-company-description">
                    {lifeAtCompany.description}
                  </p>
                  <img
                    src={lifeAtCompany.imageUrl}
                    alt="life at company"
                    className="life-at-company-image"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="similar-jobs-container">
            <h1>Similar Jobs</h1>
            <ul className="similar-jobs-list-container">
              {similarJobs.map(eachJob => (
                <li className="each-similar-job-container">
                  <div className="job-profile-container">
                    <img
                      src={eachJob.companyLogoUrl}
                      alt="similar job company logo"
                      className="company-logo"
                    />
                    <div className="job-title-container">
                      <h2 className="title">{eachJob.title}</h2>
                      <div className="rating-container">
                        <BsStarFill className="star-icon" />
                        <p>{eachJob.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h4>Description</h4>
                  <p className="description">{eachJob.jobDescription}</p>
                  <div className="loc-job-type">
                    <div className="location-container">
                      <GoLocation />
                      <p>{eachJob.location}</p>
                    </div>
                    <div className="job-type-container">
                      <BsBriefcase />
                      <p>{eachJob.employmentType}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
    <>
      <Header />
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h3 className="failure-view-heading">Oops! Something Went Wrong</h3>
        <p>We cannot seem to find the page you are looking for.</p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onfetchJobDetails}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderJobDetailsLoadingView = () => (
    <>
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobDetailsConstraints.success:
        return this.renderJobDetailsSuccessView()
      case jobDetailsConstraints.failure:
        return this.renderJobDetailsFailureView()
      case jobDetailsConstraints.inProgress:
        return this.renderJobDetailsLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetails
