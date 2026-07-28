import { pgTable, text, timestamp, boolean, serial, jsonb } from "drizzle-orm/pg-core"

// ---- Better Auth tables (do not rename columns) ----
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  isSubscribed: boolean("isSubscribed").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ---- App tables ----
export const downloadLead = pgTable("download_lead", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  activitySlug: text("activitySlug").notNull(),
  ageBand: text("ageBand"),
  newsletterOptIn: boolean("newsletterOptIn").notNull().default(false),
  userId: text("userId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const generation = pgTable("generation", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  theme: text("theme").notNull(),
  age: text("age").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

/** First-party analytics events (catalogue filters, downloads, page views). */
export const analyticsEvent = pgTable("analytics_event", {
  id: serial("id").primaryKey(),
  eventType: text("eventType").notNull(),
  sessionId: text("sessionId").notNull(),
  path: text("path"),
  properties: jsonb("properties").$type<Record<string, string | number | boolean | null>>(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})
