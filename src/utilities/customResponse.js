export const customResponse = ({
    code = 200,
    status,
    message="",
    data={},
    err ={},
    totalResult,
    totalPages
}) => {
    const customSuccess = status ? status : code < 300 ? true : false;
    return {
        success: customSuccess,
        code,
        status,
        message,
        data,
        err,
        totalResult,
        totalPages
    };
};

export const customPagination = (data=[], page = 1, pageSize = 10) => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(startIndex, endIndex);

    return {
        currentPage: page,
        pageSize: pageSize,
        totalResult: data.length,
        totalPages: Math.ceil(data.length / pageSize),
        data: paginatedData
    };
};
