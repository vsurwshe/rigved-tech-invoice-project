import React from 'react';
import "../../scss/invoiceTemplate.css"

let Invoice=(props)=>{
    return LoadInvoiceTable(props);
}

const LoadInvoiceTable=(props)=>{
return <div  className="invoice-box">
    <table id="invoiceProject" cellPadding="0" border="1" cellSpacing="0">
        <tbody>
            {MainTableSectionOne()}
            {MainTableSectionTwo({"mainProps":props})}
            {MainTableSectionThree({"mainProps":props})}
            {MainTableSectionFourth({"mainProps":props})}
        </tbody>
    </table>
</div>
}

const MainTableSectionOne=(propsData)=>{ 
    return <table className="table-border-bottom">
        <tbody>
            <tr> <td ><center>Tax Invoice</center></td></tr>
        </tbody>
    </table>
}

const MainTableSectionTwo=(propsData)=>{
    const { mainProps }=propsData
    return <table>
                <tbody>
                    {FormSection({"mainProps":mainProps})}
                    {ContactAndInvoiceDetailsRow({"mainProps":mainProps})}
                    {ToSection({"mainProps":mainProps})}
                </tbody>
        </table>
}

// this will load the from Section row
const FormSection=(propsData)=>{
    return<table>
        <tbody>
            <tr>
                <td>
                    <p style={{fontSize:12 , lineHeight:"normal"}}>
                        <b>Name: Rigved Technologies Pvt Ltd</b><br/>
                        <b>Registered Address:</b> <br/>
                        04th Floor, 408, Plot no A-1, Rupa Solitaire,<br/>
                        Millennium Business Park, Mahape,<br/>
                        Mumbai, Maharashtra, 400710, India.
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
}

// this will load the Conact info and Details Row
const ContactAndInvoiceDetailsRow=(propsData)=>{
    return<table style={{marginTop:"-20px"}}>
        <tbody>
            <tr>
                <td>
                    <p style={{fontSize:12 , lineHeight:"normal"}}>
                           Contact No : 9004353333<br/>
                           Email Id: deepika.singh@rigvedtech.com <br/>
                           CIN No.: U74900MH2008PTC186830<br/>
                        <b>Pan No.: AAECR1228G</b><br/>
                        <b>GSTIN No.: 27AAECR1228G1ZL</b><br/>
                        <b>SAC CODE : 998313</b>
                    </p>
                </td>
                <td>
                    <p style={{fontSize:12 , lineHeight:"normal"}}>
                        Invoice #: <br />
                        Date:
                    </p>  
                </td>
            </tr>
        </tbody>
    </table>
}

// this will load the to info details row
const ToSection=(propsData)=>{
    return <table style={{marginTop:"-25px"}}>
            <tbody>
                <tr>
                    <td>
                        <p style={{fontSize:12 ,fontWeight:"bold", lineHeight:"normal"}}>
                            To,<br/>
                            Hurix Systems Pvt. Ltd,<br/>
                            5th Floor, Central Wing, Unit No - 9 & 10,<br/>
                            Sai Trinity Pashan-SUS Road, Pashan, Pune - 411021
                        </p>
                        <p style={{fontSize:12 , fontWeight:"bold", lineHeight:"normal"}}>
                            Pan No.: AAECR1228G<br/>
                            GSTIN No.: 27AAECR1228G1ZL<br/>
                        </p>
                    </td>
                </tr>
            </tbody>
    </table> 
}

const MainTableSectionThree=(propsData)=>{
    return <table cellPadding="0" border="1" cellSpacing="0">
        <tbody>
            <tr className="heading">
                <td>Payment Method</td>
                <td></td>
                <td></td>
            </tr>
            <tr className="details">
                <td> {/* {props.payments && props.payments.mode} */}</td>
                <td> {/* {props.payments && props.payments.transctionsId} */}</td>
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
        </tbody>
    </table>
}

const MainTableSectionFourth=(propsData)=>{
    return <table>
        <tbody>
            <tr><td>{FooterBankSections(propsData)}</td></tr>
            <tr><td>{FooterDigitalSignSections(propsData)}</td></tr>
        </tbody>
    </table>
}

const FooterBankSections=(propsData)=>{
    return <table>
    <tbody>
        <tr>
            <td>
                <p style={{fontSize:12 , fontWeight:"bold", lineHeight:"normal"}}>
                    Cheque should be drawn in Favour of. <u>Rigved Technologies Private Limited</u>
                </p>
                <p style={{fontSize:12 , lineHeight:"normal"}}>
                    <b>Bank Details:</b> <br/>
                    Account Name.: Rigved Technologies Private Limited<br/>
                    Bank Name: Axis Bank Ltd<br/>
                    Bank Account No: 916020022757685<br/>
                    IFSC Code: UTIB0000183<br />
                    Account Type: Current<br/>
                    Bank Address: Vile Parle East Mumbai.
                </p>
            </td>
        </tr>
    </tbody>
</table>
}

const FooterDigitalSignSections=(propsData)=>{
    return<table style={{float:"right", position:"relative", width:"30%", marginTop:"-45px"}}>
        <tbody>
            <tr><td><p style={{fontSize:12 , fontWeight:"bold", lineHeight:"normal"}}>For Rigved Technologies Pvt Ltd</p></td></tr>
        </tbody>
    </table> 
}


export default Invoice;