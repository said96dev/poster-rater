import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { paginationOptsValidator } from 'convex/server'
export const createPoster = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()
    if (!user) throw new Error('you must be logged in!')
    await ctx.db.insert('poster', {
      title: args.title,
      userId: user.subject,
    })
  },
})

export const getPoster = query({
  args: {},
  handler: async (ctx, args) => {
    const userId = await ctx.auth.getUserIdentity()
    console.log(userId)
    if (!userId) return []
    return await ctx.db
      .query('poster')
      .filter((q) => q.eq(q.field('userId'), userId.subject))
      .collect()
  },
})
