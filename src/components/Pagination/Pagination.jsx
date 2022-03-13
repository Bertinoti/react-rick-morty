import React from 'react'
import { HOME } from '../../constants/routes';

const Pagination = ({nextPage, prevPage}) => {
  return (
    <div>
      <nav aria-label="Page navigation" >
        <ul className="pagination">
          <li className="page-item"><a className={`page-link  ${Boolean(paginationInfo.prev) ? null : "disabled"}`} to={`${HOME}${page -1 }`} isActive={()=> Boolean(paginationInfo.prev)}>Previous</a></li>
          <li className="page-item"><a className={`page-link  ${Boolean(paginationInfo.next) ? null: "disable"}`} to={`${HOME}${page + 1}`} isActive ={ () => Boolean(paginationInfo.next)}>Next</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination;