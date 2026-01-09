'use client';

import { useState, useEffect } from 'react';
import { portfolioService } from '@/services/portfolioService';
import { toast } from 'react-hot-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface Project {
    _id: string;
    title: string;
    titleAr?: string;
    client?: string;
    isPublished: boolean;
    completedAt?: string;
}

export default function AdminPortfolioPage() {
    const { t } = useTranslation();
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

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
            setUploading(true);
            try {
                // Determine API URL relative to backend
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload/multiple`, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Upload failed');
                }

                if (Array.isArray(data)) {
                    setFormData((prev) => ({
                        ...prev,
                        images: [...prev.images, ...data]
                    }));
                } else {
                    throw new Error('Invalid response format');
                }
                
                setUploading(false);
            } catch (error: any) {
                console.error(error);
                setUploading(false);
                toast.error(error.message || 'Image upload failed');
            }
        }
    };

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
                titleAr: project.titleAr || '',
                description: project.description,
                descriptionAr: project.descriptionAr || '',
                client: project.client || '',
                clientAr: project.clientAr || '',
                completedAt: project.completedAt ? project.completedAt.split('T')[0] : '',
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
                <h1 className="text-2xl font-bold text-white">{t('admin.portfolio.title')}</h1>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium hover:bg-primary/90 transition-colors"
                >
                    <span className="material-symbols-outlined">add</span>
                    {t('admin.portfolio.add')}
                </button>
            </div>

            <div className="bg-card-dark rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-gray-400 text-xs font-medium uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">{t('admin.portfolio.project_title')}</th>
                            <th className="px-6 py-4">{t('admin.portfolio.client')}</th>
                            <th className="px-6 py-4">{t('admin.portfolio.status')}</th>
                            <th className="px-6 py-4">{t('admin.portfolio.date')}</th>
                            <th className="px-6 py-4">{t('admin.portfolio.actions')}</th>
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
                                        {project.isPublished ? t('admin.portfolio.published') : t('admin.portfolio.draft')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {project.completedAt ? new Date(project.completedAt).toLocaleDateString() : '-'}
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
                            {editingId ? t('admin.portfolio.edit') : t('admin.portfolio.add')}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.title_en')}</label>
                                <input
                                    type="text" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.title_ar')}</label>
                                <input
                                    type="text" required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.titleAr}
                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.desc_en')}</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.desc_ar')}</label>
                                <textarea
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white h-24"
                                    value={formData.descriptionAr}
                                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.client_en')}</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.client}
                                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.client_ar')}</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    value={formData.clientAr}
                                    onChange={(e) => setFormData({ ...formData, clientAr: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.form.date')}</label>
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
                                <label className="text-sm text-gray-300">{t('admin.portfolio.form.published')}</label>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">{t('admin.portfolio.project_images')}</label>
                                <label className="relative cursor-pointer block mt-2">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={uploadFileHandler}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-center gap-3 w-full h-32 rounded-lg border-2 border-dashed border-white/20 bg-background-dark hover:border-primary hover:bg-white/5 transition-all">
                                        <span className="material-symbols-outlined text-4xl text-primary">add</span>
                                        <div className="flex flex-col items-center">
                                            <span className="text-white font-semibold">{t('admin.product.choose_images')}</span>
                                            <span className="text-gray-400 text-sm">{t('admin.product.drag_drop')}</span>
                                        </div>
                                    </div>
                                </label>
                                {uploading && <p className="text-sm text-yellow-400 mt-2">{t('admin.portfolio.uploading')}</p>}
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {formData.images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img src={img} alt="Project" className="h-24 w-24 object-cover rounded-lg border border-white/10" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <span className="material-symbols-outlined text-sm">close</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2 flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg text-white font-medium hover:bg-white/5"
                                >
                                    {t('admin.portfolio.cancel')}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary rounded-lg text-white font-medium hover:bg-primary/90"
                                >
                                    {editingId ? t('admin.portfolio.update') : t('admin.portfolio.create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
