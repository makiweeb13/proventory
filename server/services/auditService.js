const prisma = require('../utils/prisma');

const logAction = async (userId, action, entity, entityId, details) => {
    return prisma.audit_logs.create({
        data: {
            user_id: userId ? parseInt(userId) : null,
            action,
            entity,
            entity_id: entityId ? parseInt(entityId) : null,
            details: details ? JSON.stringify(details) : null
        }
    });
};

const getAuditLogs = async (search, skip, limit, order = 'desc') => {
    const where = {};
    if (search) {
        where.OR = [
            { action: { contains: search } },
            { entity: { contains: search } },
            { users: { name: { contains: search } } }
        ];
    }
    return prisma.audit_logs.findMany({
        orderBy: { created_at: order },
        where,
        include: { users: true },
        skip,
        take: limit
    });
};

const getAuditLogCount = async (search) => {
    const where = {};
    if (search) {
        where.OR = [
            { action: { contains: search } },
            { entity: { contains: search } },
            { users: { name: { contains: search } } }
        ];
    }
    return prisma.audit_logs.count({ where });
};

module.exports = { logAction, getAuditLogs, getAuditLogCount };