import classes from './QuickFilters.module.css'

export default function QuickFilters(props) {
  return (
    <div className="flex">
      <div className={`${classes.filters} ${classes['always-selected']}`}>
        Quick Filters
      </div>
      <div className={classes.filters}>Client</div>
      <div className={classes.filters}>Call ID</div>
      <div className={classes.filters}>Source IP</div>
      <div className={classes.filters}>DID</div>
      <div className={classes.filters}>DNIS</div>
      <div className={classes.filters}>SIP Code</div>
      <div className={classes.filters}>SIP Message</div>
    </div>
  )
}
