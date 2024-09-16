import React from 'react'

const DbTableColumns = ({columnsByTable}) => {

  const typeChanger=(type)=>{
    if(type==='character varying'){
      return 'varchar(255)'
    }
    return type;
  }
  return (
    <div className='my-2'>
    {columnsByTable.map((itm)=>{
      return <p className='ml-10 mt-1 text-xs font-medium'>{itm?.column_name} - <span className='text-gray-700'>{typeChanger(itm?.data_type)}</span></p>
    })}
    </div>
  )
}

export default DbTableColumns