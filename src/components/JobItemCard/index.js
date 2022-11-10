import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {ColorRing} from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    let url = window.location.href
    let urlList = url.split('/')
    let id = urlList[urlList.length-1]
    this.getJobData(id)
  }

  getJobData = async(id) => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )
      this.setState({jobDataDetails: updatedJobDetailsData,apiStatus: apiStatusConstants.success,})
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDataDetails} = this.state
    const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    skills,
    title,
    } = jobDataDetails[0]
    return (
    <>
    <Header/>
      <div className="job-item-card-container">
          <div className="first-part-container">
              <div className="img-title-container">
              <img className="company-logo" src={companyLogoUrl} alt="job details company logo" />
                  <div className="title-rating-container">
                      <h1 className="first-title-heading">{title}</h1>
                      <div className="star-rating-container">
                          <AiFillStar className="star-icon" />
                          <p className="rating-text">{rating}</p>
                      </div>
                  </div>
              </div>
              <div className="location-package-container">
                  <div className="location-job-type-container">
                      <div className="location-icon-location-container">
                          <MdLocationOn className="location-icon" />
                          <p className="location">{location}</p>
                      </div>
                      <div className="employment-type-icon-employment-type-container">
                          <p className="job-type">{employmentType}</p>
                      </div>
                  </div>
                  <div className="package-container">
                      <p className="package">{packagePerAnnum}</p>
                  </div>
              </div>
          </div>
          <hr className="item-hr-line" />
          <div className="second-part-container">
              <div className="description-visit-container">
                  <h1 className="description-job-heading">Description</h1>
                  <a className="visit-anchor" href={companyWebsiteUrl}>Visit <BiLinkExternal /></a>
              </div>
              <p className="description-para">{jobDescription}</p>
          </div>
          <h1 className='skill-heading'>Skills</h1>
          <ul className="ul-job-details-container">
              {skills.map(eachItem => (
                  <li className="li-job-details-container" key={eachItem.name}>
                      <img className="skill-img" src={eachItem.imageUrl} alt={eachItem.name}/>
                      <p className='skill-name'>{eachItem.name}</p>
                  </li>
              ))}
          </ul>
          <div className="company-life-img-container">
              <div className="life-heading-para-container">
                  <h1 className='life-heading'>Life at Company</h1>
                  <p className='life-para'>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" className='life-img'/>
          </div>
      </div>
    </>
    )
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="job-details-failure-view">
      <img src="https://i.postimg.cc/13WFSGQb/Pngtree-success-or-failure-in-businessman-7257930.png" alt="failure view" className='failure-img' />
      <h1 className='failure-head'>Oops! Something Went Wrong</h1>
      <p className='failure-para'>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button className="failure-jod-details-btn" type="button" onClick={this.onRetryJobDetailsAgain}>retry</button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="job-details-loader" testid="loader">
      <ColorRing type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJobItem