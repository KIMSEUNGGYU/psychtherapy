// COMMON
exports.badRequset = () => ({ message: "Bad Request", result: {} });
exports.empty = () => ({ message: "Empty Object", result: {} });

// /ADMIN/USERS
exports.getUsers = users => ({
  message: "Success",
  result: { users, totalCount: users.length },
});

// /ADMIN/PARTNERS
exports.getPartners = partners => ({
  message: "Success",
  result: { partners, totalCount: partners.length },
});
