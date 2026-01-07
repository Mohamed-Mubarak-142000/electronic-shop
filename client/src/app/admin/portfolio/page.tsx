'use client';

import { useState, useEffect } from 'react';
import { portfolioService } from '@/services/portfolioService';
import { toast } from 'react-hot-toast';

interface Project {
    _id: string;
    title: string;
    titleAr: string;
    client: string;
    isPublished: boolean;
    completedAt: string;
}

export default function AdminPortfolioPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        client: '',
        clientAr: '',
        completedAt: '',
        images: [] as string[],
        isPublished: true
    });

    const fetchProjects = async () => {
        try {
            const data = await portfolioService.getPortfolios();
            setProjects(data);
        } catch (error) {
            toast.error('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const resetForm = () => {
        setFormData({
            title: '',
            titleAr: '',
            description: '',
            descriptionAr: '',
            client: '',
            clientAr: '',
            completedAt: '',
            images: [],
            isPublished: true
        });
        setEditingId(null);
    };

    const handleEdit = async (id: string) => {
        try {
            const project = await portfolioService.getPortfolioById(id);
            setFormData({
                title: project.title,
                titleAr: project.titleAr,
                description: project.description,
                descriptionAr: project.descriptionAr,
                client: project.client,
                clientAr: project.clientAr,
                completedAt: project.completedAt.split('T')[0],
                images: project.images,
                isPublished: project.isPublished
            });
            setEditingId(id);
            setShowModal(true);
        } catch (error) {
            toast.error('Failed to load project details');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await portfolioService.updatePortfolio(editingId, formData);
                toast.success('Project updated');
            } else {
                await portfolioService.createPortfolio(formData);
                toast.success('Project created');
            }
            setShowModal(false);
            resetForm();
            fetchProjects();
        } catch (error) {
            toast.error('Failed to save project');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await portfolioService.deletePortfolio(id);
            toast.success('Project deleted');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete project');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add New Project
                </button>
            </div>

            <div className="bg-card-dark rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Project Title</th>
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {projects.map((project) => (
                            <tr key={project._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{project.title}</div>
                                    <div className="text-xs text-gray-500">{project.titleAr}</div>
                                </td>
                                <td className="px-6 py-4">{project.client}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-xs ${project.isPublished ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'
                                        }`}>
                                        {project.isPublished ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {new Date(project.completedAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(project._id)} className="text-primary hover:text-white">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:text-white">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="bg-background-dark w-full max-w-2xl rounded-2xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold text-white mb-6">
                            {editingId ? 'Edit Project' : 'New Project'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Title (EN)</label>
                                <input
                                    type="text" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Title (AR)</label>
                                <input
                                    type="text" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description (EN)</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description (AR)</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-24"
                                    value={formData.descriptionAr}
                                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Client (EN)</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Client (AR)</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.clientAr}
                                    onChange={(e) => setFormData({ ...formData, clientAr: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Completion Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.completedAt}
                                    onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-2 h-full pt-4">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                                    className="rounded border-white/10 bg-white/5"
                                />
                                <label className="text-sm text-gray-300">Published</label>
                            </div>

                            <div className="col-span-2 flex gap-4 pt-6">
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
                                    {editingId ? 'Update Project' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
