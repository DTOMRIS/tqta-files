export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  courseId: integer('course_id').references(() => courses.id),
  lessonId: integer('lesson_id').references(() => lessons.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Students tablosu
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  dateOfBirth: date('date_of_birth'),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  country: varchar('country', { length: 100 }),
  enrollmentDate: timestamp('enrollment_date').defaultNow().notNull(),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// DMA Tabel (DMA kayıtları için)
export const dma_tabel = pgTable('dma_tabel', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id),
  registrationNumber: varchar('registration_number', { length: 50 }).unique(),
  registrationDate: timestamp('registration_date').defaultNow().notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  notes: text('notes'),
  approvedBy: varchar('approved_by', { length: 255 }),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});