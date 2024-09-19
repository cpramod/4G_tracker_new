import React from 'react'

const DbTableColumns = ({columnsByTable}) => {

  const removeQuote=(data)=>{
    if(data.includes('"')){
      return data.replace(/"/g, '');
    }
    return data;
  }

  const typeChanger=(type)=>{
    if(type==='character varying'){
      return 'varchar(255)'
    }
    return type;
  }
  return (
    <div className='my-2'>
    {columnsByTable.map((itm)=>{

      return <p className='ml-10 mt-1 text-xs font-medium'>{removeQuote(itm?.column_name)} - <span className='text-gray-700'>{removeQuote(typeChanger(itm?.data_type))}</span></p>
    })}
    </div>
  )
}

export default DbTableColumns