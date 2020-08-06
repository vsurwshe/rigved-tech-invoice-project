import React from 'react';
import "../../scss/invoiceTemplate.css"

let Invoice=(props)=>{
    return LoadInvoiceTable(props);
}

const LoadInvoiceTable=(props)=>{
let tableColSpan="3";
return <div  className="invoice-box">
    <table id="invoiceProject" cellPadding="0" border="1" cellSpacing="0">
        <tbody>
            {MainTableSectionOne({tableColSpan})}
            {MainTableSectionTwo({"mainProps":props,tableColSpan})}
            {MainTableSectionThree({"mainProps":props,tableColSpan})}
            {MainTableSectionFourth({"mainProps":props,tableColSpan})}
        </tbody>
    </table>
</div>
}

const MainTableSectionOne=(propsData)=>{ 
    const { tableColSpan }=propsData
    return <>
        <tr> <td colSpan={tableColSpan}><center>Tax Invoice</center></td></tr>
        <tr> <td colSpan={tableColSpan}><div style={{padding:6}}></div></td></tr>
    </>
}

const MainTableSectionTwo=(propsData)=>{
    const { tableColSpan, mainProps }=propsData
    return <>
        <tr>
            <td colSpan={tableColSpan}>
                <table>
                    <tbody>
                        {FormSection({"mainProps":mainProps,tableColSpan})}
                        {ContactAndInvoiceDetailsRow({"mainProps":mainProps})}
                        {ToSection({"mainProps":mainProps})}
                    </tbody>
                </table>
            </td>
        </tr>
    </>
}

// this will load the from Section row
const FormSection=(propsData)=>{
    const { tableColSpan }=propsData
    return<tr>
        <td colSpan={tableColSpan}><h1>V & Y</h1></td>
    </tr>
}

// this will load the Conact info and Details Row
const ContactAndInvoiceDetailsRow=(propsData)=>{
    return<tr>
        <td className="title"> <h1>V & Y</h1></td>
        <td>
            Invoice #: <br />
            Date: <br />
        </td>
</tr>
}

// this will load the to info details row
const ToSection=(propsData)=>{
    return <tr>
    <td className="title">
        <b>Form :</b> <br />
        V & Y Soft. Tech. Pvt. Ltd.<br />
        Nanded-Hyderbad Hwy,<br />
        Mahashtraha, IN-431603.
    </td>
    <td className="title">
        <b>To :</b><br />
        Acme Corp.<br />
        John Doe<br />
        john@example.com
    </td>
    <td></td>
</tr>
}

const MainTableSectionThree=(propsData)=>{
    const { tableColSpan }=propsData
    return <>
        <tr className="heading">
            <td>Payment Method</td>
            <td></td>
            <td></td>
        </tr>
        <tr className="details">
            <td>
                {/* {props.payments && props.payments.mode} */}
            </td>
            <td>
                {/* {props.payments && props.payments.transctionsId} */}
            </td>
            <td></td>
        </tr>

        <tr className="heading">
            <td>Item</td>
            <td>Qty</td>
            <td>Price</td>
        </tr>
        {/* {props.invoiceItem && props.invoiceItem.map((item, key) => {
            return <tr key={key} className="item" >
                <td>{item.itemName}</td>
                <td>{item.itemQty}</td>
                <td>{item.itemPrice}</td></tr>
        })
        } */}
        <tr className="total">
            <td></td>
            <td>Total:</td>
            <td>$1200</td>
        </tr>
    </>
}

const MainTableSectionFourth=(propsData)=>{
    const { tableColSpan }=propsData
    return <>
        <tr><td colSpan={tableColSpan}>Sections 4</td></tr>
    </>
}

export default Invoice;