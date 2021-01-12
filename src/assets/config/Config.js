const API_URL="http://103.224.240.187:9003";
const API_EXE_TIME=500;
const API_INVOCIE_EXE_TIME=1000;

const AlertColor={
    success:"success",
    danger:"error",
    warning: "warning"
}

const FromActions={
    "CR":"CREATE",
    "VI": "VIEW",
    "ED":"EDIT",
    "DE":"DELETE",
    "VIED":"VIEWEDIT"
}

const ProjectBillingModelType={
    MILE_STONE:"Mile Stone",
    FIXED_TYPE:"Fixed Rate",
    PAYABLES_DAY:"Payable Days",
    FREE_STYLE:""
}

export{
    API_URL,
    AlertColor,
    API_EXE_TIME,
    FromActions,
    API_INVOCIE_EXE_TIME,
    ProjectBillingModelType
}