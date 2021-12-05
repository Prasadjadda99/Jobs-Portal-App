import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsStarFill, BsBriefcase, BsSearch} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import Header from '../Header'
import Profile from '../Profile'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    selectedSalary: '',
    searchInput: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  // Select Employment Type
  onSelectedEmployment = event => {
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.applyFilters,
      )
    } else {
      const {employmentType} = this.state
      const updatedEmployementType = employmentType.filter(
        eachVal => eachVal !== event.target.value,
      )
      this.setState(
        {employmentType: [...updatedEmployementType]},
        this.applyFilters,
      )
    }
  }

  // Select Salary Range
  onSelectedSalaryRange = event => {
    this.setState(
      {
        selectedSalary: event.target.value,
      },
      this.applyFilters,
    )
  }

  // Search Particular Job
  searchJob = event => {
    event.preventDefault()
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.applyFilters()
  }

  onSubmitSearchIcon = event => {
    event.preventDefault()
  }

  // Jobs to display
  renderJobSuccessView = () => {
    const {jobsData} = this.state
    let notEmpty
    if (jobsData.length !== 0) {
      notEmpty = true
    } else {
      notEmpty = false
    }

    return (
      <ul className="job-container">
        {notEmpty ? (
          jobsData.map(eachJob => (
            <Link to={`/jobs/${eachJob.id}`} className="job-link">
              <li className="job-item-container" key={eachJob.id}>
                <div className="job-details-container-1">
                  <img
                    src={eachJob.companyLogoUrl}
                    alt="company logo"
                    className="company-logo"
                  />
                  <div className="job-role-details-container">
                    <h3 className="title">{eachJob.title}</h3>
                    <div className="rating-container">
                      <BsStarFill className="star-icon" />
                      <p className="star-rating">{eachJob.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="job-details-container-2">
                  <div className="loc-jobtype-container">
                    <div className="location-container">
                      <GoLocation className="location" />
                      <p className="location-des">{eachJob.location}</p>
                    </div>
                    <div className="job-type-container">
                      <BsBriefcase className="employment" />
                      <p className="employment-des">{eachJob.employmentType}</p>
                    </div>
                  </div>
                  <h2 className="package">{eachJob.packagePerAnnum}</h2>
                </div>
                <hr className="hr-line" />
                <div className="description-container">
                  <h1 className="des-head">Description</h1>
                  <p className="jd">{eachJob.jobDescription}</p>
                </div>
              </li>
            </Link>
          ))
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )}
      </ul>
    )
  }

  // Request a API call to get Jobs Data
  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedJobs = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    this.setState({
      jobsData: updatedJobs,
    })
  }

  // After apply Filters means Adding salary,employmentType
  applyFilters = async () => {
    const {searchInput, employmentType, selectedSalary} = this.state
    const jwtToken = Cookies.get('jwt_token')
    let employmentParamString = ''

    if (employmentType !== []) {
      employmentParamString = employmentType.join(',')
      // console.log(employmentParamString)
    }

    const url = `https://apis.ccbp.in/jobs/?search=${searchInput}&&employment_type=${employmentParamString}&&minimum_package=${selectedSalary}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedJobs = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({jobsData: updatedJobs})
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs">
          <div className="jobs-container">
            <form
              className="search-container"
              onSubmit={this.onSubmitSearchIcon}
            >
              <input
                type="search"
                className="search-input"
                onChange={this.searchJob}
              />
              <button
                type="submit"
                className="search-button"
                testid="searchButton"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon" testid="searchButton" />
              </button>
            </form>
            <Profile />
            <hr />
            <ul className="employment-type-list">
              <h2 className="employment-type-heading">Type of Employment</h2>
              {employmentTypesList.map(employment => {
                const {label, employmentTypeId} = employment
                return (
                  <li className="employment-type-item">
                    <input
                      type="checkbox"
                      name={employmentTypeId}
                      id={employmentTypeId}
                      value={employmentTypeId}
                      onClick={this.onSelectedEmployment}
                    />
                    <label
                      htmlFor={employmentTypeId}
                      className="employment-type-label"
                    >
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>
            <hr />
            <ul className="salary-list">
              <h2 className="salary-list-heading">Salary Range</h2>
              {salaryRangesList.map(salary => {
                const {salaryRangeId, label} = salary
                return (
                  <li className="salary-item">
                    <input
                      type="radio"
                      name="salary"
                      id={salaryRangeId}
                      value={salaryRangeId}
                      onClick={this.onSelectedSalaryRange}
                    />
                    <label
                      className="salary-item-label"
                      htmlFor={salaryRangeId}
                    >
                      {label}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <form
              className="search-container-desktop"
              onSubmit={this.onSubmitSearchIcon}
            >
              <input
                type="search"
                className="search-input-desktop"
                onChange={this.searchJob}
              />
              <button
                type="submit"
                testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search-icon-desktop" />
              </button>
            </form>
            {this.renderJobSuccessView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
