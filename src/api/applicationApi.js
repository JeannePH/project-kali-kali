import {supabase} from '../supabase'

export const fetchApplications = async () => {
    const {data, error} = await supabase
        .from('application')
        .select('id, created_at, name, weweb_id')

    if (error) throw error
    return data
}