import db from '../../utils/db'

export default async (req, res) => {
  const {id} = req.body
  try {
    await db.collection('entries').doc(id).update({
      approved: true,
    })
    res.status(200).send({message: 'Successfully approved'})
  } catch (e) {
    res.status(400).send({
      message: 'Something went wrong on the post approval',
    })
  }
}
