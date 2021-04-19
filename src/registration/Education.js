import React from "react"
const Education = (props) => {
  return (
    props.educationDetailDtos.map((val, idx) => {
     let   boardName =`boardName-${idx}`, obtainedGrade =`obtainedGrade-${idx}`,passedLevel =`passedLevel-${idx}`,passedYear =`passedYear-${idx}`
      return (

<tr className="table-active" key={val.index}>

<td>
<input name="boardName"  onChange={props.onChange} data-id={idx} id={boardName} type="text" className="form-control border" placeholder="boardName" />

</td>
<td>
<input name="obtainedGrade"  onChange={props.onChange} data-id={idx} id={obtainedGrade} type="text" className="form-control border" placeholder="obtainedGrade" />

</td>
<td>
<input name="passedLevel"  onChange={props.onChange} data-id={idx} id={passedLevel} type="text" className="form-control border" placeholder="passedLevel" />

</td>
<td>
<input name="passedYear"  onChange={props.onChange} data-id={idx} id={passedYear} type="text" className="form-control border" placeholder="passedYear" />

</td>

<td>
  {
   idx===0?
               <button onClick={()=>props.add()} type="button" className="btn btn-primary text-center"><i>add</i></button>
               : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><span>Delete</span></button>
               } 
</td>
</tr >
      
      )
    })

  )
}
export default Education