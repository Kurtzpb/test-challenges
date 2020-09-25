// modules
import React from 'react'
import moment from 'moment'

// comonents
import Table from 'antd/es/table'
import Button from 'antd/es/button'
import CheckBox from 'antd/es/checkbox'
import Input from 'antd/es/input'

class ChallengesList extends React.Component {
  state = {
    pagination: {
      position: 'both',
      size: 'small',
      total: 0,
      current: 1,
      pageSize: 10,
      defaultCurrent: 1,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
    },
    sort: {
      sortedColumn: 'createdAt',
      sortedColumnOrder: 'ascend'
    },
    searchValue: '',
    isFavoritesDisplays: false
  }

  componentDidMount = () => {
    this.fetchChallengesList()
  }

  getQuery = () => {
    const {
      pagination: { pageSize, current },
      sort: { sortedColumn, sortedColumnOrder },
      searchValue
    } = this.state

    const query = {
      page: current,
      limit: pageSize,
      sortBy: sortedColumn,
      sortDirection: sortedColumnOrder === 'ascend' ? 'asc' : 'dsc'
    }

    if (searchValue) query.search = searchValue

    return query
  }

  fetchChallengesList = async () => {
    const { getChallengesList } = this.props

    const query = this.getQuery()

    const meta = await getChallengesList(query)

    if (meta) {
      this.setState(state => ({
        ...state,
        pagination: {
          ...state.pagination,
          total: meta.totalCount
        }
      }))
    }
  }

  searchChallenge = () => {
    const { state: { value: searchValue } } = this.search

    this.setState(state => ({ ...state, searchValue }), this.fetchChallengesList)
  }

  onTableChange = ({ current }, __, { columnKey: sortedColumn, order: sortedColumnOrder, column }) => this.setState(state => ({
    ...state,
    sort: {
      sortedColumn: column && sortedColumn ? sortedColumn : 'challengeName',
      sortedColumnOrder: column && sortedColumnOrder ? sortedColumnOrder : 'ascend'
    },
    pagination: {
      ...state.pagination,
      current
    }
  }), this.fetchChallengesList)

  getColumns = () => {
    const { isFavoritesDisplays } = this.state

    return [
      {
        title: 'Icon',
        dataIndex: 'challengeImage',
        key: 'challengeImage',
        render: img => <img alt="Logo" src={img} width={50} height={50} />
      },
      {
        sorter: !isFavoritesDisplays,
        title: 'Challenge Name',
        dataIndex: 'challengeName',
        key: 'challengeName',
      },
      {
        sorter: !isFavoritesDisplays,
        title: 'Number of questions',
        dataIndex: 'numberOfQuestions',
        key: 'numberOfQuestions',
      },
      {
        sorter: !isFavoritesDisplays,
        title: 'Creation Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: date => (
          <div>
            <span>{moment(date).format('MM/DD/YYYY')}</span><br />
            <span>{moment(date).format('h:mm A')}</span>
          </div>
        )
      },
      {
        title: 'Actions',
        dataIndex: 'challengeId',
        key: 'challengeId',
        render: (id, { isFavorite }) => (
          <>
            <Button
              size="small"
              style={{ marginRight: 15 }}
              onClick={() => this.props.history.push(`/${id}`)}
            >View Challenge</Button>
            <CheckBox
              checked={isFavorite}
              onChange={this.toggleChallengeAsFavorite(id)}
            />
          </>
        )
      }
    ]
  };

  toggleChallengeAsFavorite = id => e => {
    const isFavorite = e.target.checked
    const { challengesList, setChallengesList } = this.props

    const updatedList = challengesList.map(challenge => {
      if (challenge.challengeId !== id) return challenge

      return {
        ...challenge,
        isFavorite
      }
    })

    setChallengesList(updatedList)
  }

  toggleFavoriteList = e => {
    const isFavoritesDisplays = e.target.checked

    this.setState({ isFavoritesDisplays })
  }

  render () {
    const {
      challengesList,
      challengesListLoading
    } = this.props

    const {
      pagination,
      isFavoritesDisplays
    } = this.state

    return (
      <>
        <h1>{isFavoritesDisplays ? 'Favorites' : 'Challenges'}</h1>
        <div className="challenge-search">
          <Input disabled={isFavoritesDisplays} onPressEnter={this.searchChallenge} ref={search => { this.search = search }} placeholder="Search Challenges" />
          <Button disabled={isFavoritesDisplays} onClick={this.searchChallenge} type="primary">Search</Button>
        </div>
        <div className="favorite-checkbox">
          <p className="favorite-checkbox-label">Display Favorites</p>
          <CheckBox checked={isFavoritesDisplays} onChange={this.toggleFavoriteList} />
        </div>
        <Table
          columns={this.getColumns()}
          dataSource={isFavoritesDisplays ? challengesList.filter(({ isFavorite }) => isFavorite) : challengesList}
          loading={challengesListLoading}
          pagination={!isFavoritesDisplays && pagination}
          onChange={this.onTableChange}
          bordered
          rowKey="challengeId"
        />
      </>
    )
  }
}

export default ChallengesList
