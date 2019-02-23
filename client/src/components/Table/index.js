import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import './style.css'

class CustomTable extends React.Component {
    render () {
        const { data, header, ...restProps } = this.props
        return (
            <Paper>
                <Table { ...restProps }>
                    { 
                        header ? 
                            <TableHead>
                                <TableRow>
                                    {header.map(item => <TableCell align="center">{ item }</TableCell>)}
                                </TableRow>
                            </TableHead>
                        : null 
                    }
                    <TableBody>
                        {
                            data.length > 0 ? data.map(row => (
                            <TableRow key={row.id}>
                                {row.map(item => <TableCell align="center">{ item }</TableCell>)}
                            </TableRow>
                        ))
                        :
                            <span className='sem-registros'> - Sem Registros - </span>
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default CustomTable