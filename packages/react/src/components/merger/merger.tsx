import { PdfFile } from '@unionpdf/models';
import React, { useCallback, useEffect, useState } from 'react';
import { usePdfEngine } from '../../core';
import { useUIComponents, useUIStrings } from '../../adapters';
import { Downloader } from '../common';
import './merger.css';

/**
 * Step for pdf merging
 */
export enum MergeStep {
  /**
   * Used for file selection
   */
  Prepare,
  /**
   * Merging files
   */
  Merging,
  /**
   * Merging is succeed
   */
  Succeed,
  /**
   * Merging is failed
   */
  Failed,
}

/**
 * Properties of PdfMerger
 */
export interface PdfMergerProps {
  files: PdfFile[];
  onRemoveFile: (file: PdfFile) => void;
  onMerged: (file: PdfFile) => void;
}

/**
 * Pdf merger, used to merge multiple files
 * @param props - Properties of PdfMerger
 * @returns
 *
 * @public
 */
export function PdfMerger(props: PdfMergerProps) {
  const { files, onRemoveFile } = props;
  const strings = useUIStrings();
  const { Button } = useUIComponents();

  const [step, setStep] = useState(MergeStep.Prepare);

  const startMerge = useCallback(() => {
    setStep(MergeStep.Merging);
  }, [setStep]);

  const [mergedFile, setMergedFile] = useState<PdfFile | null>(null);

  const onMerged = useCallback(
    (file: PdfFile) => {
      props.onMerged(file);
      setMergedFile(file);

      setStep(MergeStep.Succeed);
    },
    [props.onMerged, setStep, setMergedFile]
  );

  const onFailed = useCallback(() => {
    setStep(MergeStep.Failed);
  }, [setStep]);

  let content = null;
  switch (step) {
    case MergeStep.Prepare:
      content = (
        <section>
          {files.length === 0 ? (
            <p>{strings.noFiles}</p>
          ) : (
            <div>
              <table>
                <tbody>
                  {files.map((file) => {
                    return (
                      <tr key={file.name}>
                        <td>{file.name}</td>
                        <td>
                          <Button
                            onClick={() => {
                              onRemoveFile(file);
                            }}
                          >
                            {strings.remove}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Button onClick={startMerge}>{strings.merge}</Button>
            </div>
          )}
        </section>
      );
      break;
    case MergeStep.Merging:
      content = (
        <PdfMergeTask files={files} onMerged={onMerged} onFailed={onFailed} />
      );
      break;
    case MergeStep.Succeed:
      content = mergedFile ? (
        <Downloader name={mergedFile.name} content={mergedFile.content} />
      ) : null;
      break;
    case MergeStep.Failed:
      content = null;
      break;
  }

  return <div className="pdf__merger">{content}</div>;
}

/**
 * Properties of PdfMergeTask
 */
export interface PdfMergeTaskProps {
  /**
   * Pdf files
   */
  files: PdfFile[];
  /**
   * Callback when files are merged
   * @param file - merged file
   * @returns
   */
  onMerged: (file: PdfFile) => void;
  /**
   * Callback when files can't be merged
   * @param error - error instance
   * @returns
   */
  onFailed: (error: Error) => void;
}

/**
 * Component for performing file merge
 * @param props - properties of PdfMergeTask
 * @returns
 */
export function PdfMergeTask(props: PdfMergeTaskProps) {
  const { files, onMerged, onFailed } = props;
  const engine = usePdfEngine();

  useEffect(() => {
    if (engine) {
      const task = engine.merge(files);
      task.wait(onMerged, onFailed);

      return () => {
        task.abort();
      };
    }
  }, [files, engine, onMerged, onFailed]);
  const strings = useUIStrings();

  return <p>{strings.merging}</p>;
}
