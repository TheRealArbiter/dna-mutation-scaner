export const  generateWhereQuery = (data)  => {
    let tableKeys = "",
        tableValues = "";
    for (let key in data) {
        tableKeys += `${key},`;
        tableValues += `'${data[key]}',`
    }

    tableKeys = tableKeys.slice(0, -1);
    tableValues = tableValues.slice(0, -1).trim();
    let query = `${tableKeys} = ${tableValues}`;
    return query;
}

export const execParams = (data) => {
    let tableKeys = ``;
    let length = Object.keys(data).length

    for (let index = 0; index < length; index++) {
        const value = Object.values(data)[index];
        const key = Object.keys(data)[index]
        if (index != 0) {
            tableKeys += ', '
        }
        if (typeof value == 'string') {
            tableKeys += `@${key} = '${value}'`;
        } else {
            tableKeys += `@${key} = ${value}`;
        }

    }
    
    let query = `${tableKeys}`;
    return query;
}

export const buildConditions =  (params) => {
    var conditions = [];
    var values = [];
  
   for(let param in params){
       conditions.push(param)
   }
   
   values.push(Object.values(params).join(', '))
  
  
    return {
      where: conditions.length ?
               conditions.join(' AND ') : '1',
      values: values
    };
  }
