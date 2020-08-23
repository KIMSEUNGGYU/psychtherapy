// COMMON
exports.badRequset = () => ({ message: "Bad Request", result: {} });
exports.empty = () => ({ message: "Empty Object", result: {} });

// /ADMIN/USERS
exports.getUsers = (users, totalCount) => ({
  message: "Success",
  result: { users, totalCount },
});

// /ADMIN/PARTNERS
exports.getPartners = (partners, totalCount) => ({
  message: "Success",
  result: { partners, totalCount },
});

// /PUT
exports.update = () => ({ message: "Updated Success", result: {} });
exports.updateFail = () => ({ message: "Updated Fail", result: {} });
