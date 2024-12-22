import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CloudCircleSharp, CloudUpload, Image, Video, Filter, PermContactCalendarOutlined, Search, AttachFile, Folder } from '@material-ui/icons';
import { Button, Input, Select } from '@material-ui/core';
import Hero from '../hero';


// Initialize Supabase client (replace with your project credentials)
const supabaseUrl = 'https://xqqpkuexnfpcatboikbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxcXBrdWV4bmZwY2F0Ym9pa2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzk2MDYsImV4cCI6MjA1MDIxNTYwNn0.XsMnspAJ4LjoxJ2AHOhB4PXlZV8skuytMtpsWub8mnU';
const supabase = createClient(supabaseUrl, supabaseKey);

const MediaPlatform = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [filterType, setFilterType] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFiles();
    }, [filterType, sortOrder]);

    const fetchFiles = async () => {
        try {
            let query = supabase.storage.from('PHebeEliot').list();

            const { data, error } = await query;
            if (error) throw error;

            let filteredFiles = data.map(file => ({
                ...file,
                type: getFileType(file.name),
                url: supabase.storage.from('PHebeEliot').getPublicUrl(file.name).data.publicUrl
            }));

            // Apply filters
            if (filterType !== 'all') {
                filteredFiles = filteredFiles.filter(file => file.type === filterType);
            }

            // Apply search
            if (searchQuery) {
                filteredFiles = filteredFiles.filter(file =>
                    file.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Apply sorting
            filteredFiles.sort((a, b) => {
                if (sortOrder === 'newest') {
                    return new Date(b.created_at) - new Date(a.created_at);
                }
                return new Date(a.created_at) - new Date(b.created_at);
            });

            setFiles(filteredFiles);
        } catch (error) {
            setError('Error fetching files: ' + error.message);
        }
    };

    const getFileType = (filename) => {
        const ext = filename.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
        if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) return 'video';
        return 'other';
    };

    const handleFileUpload = async (event) => {
        try {
            setUploading(true);
            setError(null);
            const file = event.target.files[0];

            if (!file) return;

            // Validate file size (max 100MB)
            if (file.size > 100 * 1024 * 1024) {
                throw new Error('File size must be less than 100MB');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('PHebeEliot')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            await fetchFiles();
        } catch (error) {
            setError('Error uploading file: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (<>
    
        <div className="container-fluid py-4 bg-light">
            <div className="container">
                {/* Header */}

                <h1 className="display-6 mb-4">Media Upload Platform</h1>
                <p>Share the beatiful moments you captured with us!</p>
                {/* Upload Section */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="d-flex flex-column flex-sm-row align-items-center gap-3">
                            <button
                                className="btn theme-btn position-relative overflow-hidden"
                                disabled={uploading}
                            >
                                <input
                                    type="file"
                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: '0',  // Hides the file name
                                        padding: '0'    // Removes any internal spacing
                                    }}
                                    onChange={handleFileUpload}
                                    accept="image/*,video/*"
                                />
                                <CloudUpload className="me-2" style={{ width: '1rem', height: '1rem' }} />
                                {uploading ? 'Uploading...' : 'Upload File'}
                            </button>
                            {uploading && <CloudCircleSharp className="spinner-border" style={{ width: '1rem', height: '1rem' }} />}
                        </div>
                        {error && (
                            <div className="alert alert-danger mt-3">
                                <p className="mb-0">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-12 col-sm-4">
                                <div className="d-flex align-items-center gap-2">
                                    <Filter style={{ width: '1rem', height: '1rem' }} />
                                    <select
                                        className="form-select"
                                        value={filterType}
                                        onChange={e => setFilterType(e.target.value)}
                                    >
                                        <option value="all">All Files</option>
                                        <option value="image">Images</option>
                                        <option value="video">Videos</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="d-flex align-items-center gap-2">
                                    <PermContactCalendarOutlined style={{ width: '1rem', height: '1rem' }} />
                                    <select
                                        className="form-select"
                                        value={sortOrder}
                                        onChange={e => setSortOrder(e.target.value)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="d-flex align-items-center gap-2">
                                    <Search style={{ width: '1rem', height: '1rem' }} />
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search files..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Grid */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {files.map((file) => (
                        <div key={file.id} className="col">
                            <div className="card h-100">
                                <div className="position-relative" style={{ aspectRatio: '1/1' }}>
                                    {file.type === 'image' ? (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="card-img-top object-fit-cover h-100 w-100"
                                        />
                                    ) : file.type === 'video' ? (
                                        <video
                                            src={file.url}
                                            className="card-img-top object-fit-cover h-100 w-100"
                                            controls
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center h-100 bg-light">
                                            <Folder style={{ width: '3rem', height: '3rem' }} className="text-secondary" />
                                        </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <p className="card-title text-truncate mb-1">{file.name}</p>
                                    <p className="card-text small text-muted">
                                        {new Date(file.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
                <Hero></Hero>
        </>
    );
};

export default MediaPlatform;