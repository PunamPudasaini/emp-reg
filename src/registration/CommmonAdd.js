import React from "react"
const Common = (props) => {
  return (
    props.workHistoryDtos.map((val, idx) => {
      let officeName = `officeName-${idx}`, workDuration = `workDuration-${idx}`, designation = `designation-${idx}`, salary = `salary-${idx}`
      return (
        <tr className="table-active" key={val.index}>
          <td>
            <input name="officeName" data-id={idx} id={officeName}
             onChange={props.onChange}
            //  value={val.officeName}
             type="text" 
             className="form-control border" 
             placeholder="officeName" />

          </td>
          <td>
            <input name="workDuration"
             data-id={idx} 
             id={workDuration}
             onChange={props.onChange}
            //  value="workDuration"
              type="text" className="form-control border" placeholder="workDuration" />

          </td>
          <td>
            <input name="designation" 
             onChange={props.onChange}
            //  value="designation"
            data-id={idx} id={designation} type="text" className="form-control border" placeholder="designation" />

          </td>
          <td>
            <input name="salary"
             onChange={props.onChange}
            //  value="salary"
             data-id={idx} id={salary} type="text" className="form-control border" placeholder="salary" />

          </td>

          <td>
            {
              idx === 0 ?
                <button onClick={() => props.add()} type="button" className="btn btn-primary text-center"><i>add</i></button>
                : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><span>Delete</span></button>
            }
          </td>
        </tr >

      )
    })


  )

}
export default Common