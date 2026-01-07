'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

interface Job {
    _id: string;
    name: string;
    type: string;
    scheduledAt: string;
    status: string;
    data: any;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newJob, setNewJob] = useState({
        name: '',
        type: 'notification',
        scheduledAt: '',
        data: {
            message: '',
            messageAr: ''
        }
    });

    const fetchJobs = async () => {
        try {
            const { data } = await api.get('/jobs');
            setJobs(data);
        } catch (error) {
            toast.error('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/jobs', newJob);
            toast.success('Job scheduled successfully');
            setShowModal(false);
            fetchJobs();
        } catch (error) {
            toast.error('Failed to schedule job');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Background Jobs</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    <span className="material-symbols-outlined">add</span>
                    Schedule New Job
                </button>
            </div>

            <div className="bg-card-dark rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Scheduled For</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {jobs.map((job) => (
                            <tr key={job._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{job.name}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-md bg-white/5 text-xs">
                                        {job.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-xs ${job.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                                            job.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {job.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {new Date(job.scheduledAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-white">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {jobs.length === 0 && !loading && (
                    <div className="p-10 text-center text-gray-500">No jobs scheduled</div>
                )}
            </div>

            {/* Modal - Basic implementation */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-background-dark w-full max-w-md rounded-2xl border border-white/10 p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Schedule Job</h2>
                        <form onSubmit={handleCreateJob} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Job Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={newJob.name}
                                    onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Type</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={newJob.type}
                                    onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                >
                                    <option value="notification">Notification</option>
                                    <option value="discount">Product Discount</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Date & Time</label>
                                <input
                                    type="datetime-local"
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={newJob.scheduledAt}
                                    onChange={(e) => setNewJob({ ...newJob, scheduledAt: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Message (English)</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-20"
                                    value={newJob.data.message}
                                    onChange={(e) => setNewJob({ ...newJob, data: { ...newJob.data, message: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Message (Arabic)</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-20"
                                    value={newJob.data.messageAr}
                                    onChange={(e) => setNewJob({ ...newJob, data: { ...newJob.data, messageAr: e.target.value } })}
                                />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-white font-medium hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary rounded-lg text-white font-medium hover:bg-primary/90"
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
